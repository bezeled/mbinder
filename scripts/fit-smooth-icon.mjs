/**
 * Flatten tessellated paths → collapse near-collinear points → Catmull–Rom → Bézier (uniform).
 * Control points cannot “overshoot” the way unconstrained spline fitting can.
 * Run: cd memorybinder && node scripts/fit-smooth-icon.mjs
 */
import fs from "node:fs";
import path from "node:path";

const iconPath = path.resolve("apps/web/public/icon.svg");
const raw = fs.readFileSync(iconPath, "utf8");

const paths = [...raw.matchAll(/<path\s([^>]+)\/>/g)].map(([, attrs]) => {
  const fill = /fill="([^"]+)"/.exec(attrs)?.[1] ?? "#000";
  const d = /d="([^"]+)"/.exec(attrs)?.[1] ?? "";
  return { fill, d };
});

function flattenPath(d, subdivQ = 16) {
  const pts = [];
  const re = /([MLQZ])([^MLQCZ]*)/gi;
  let rm;
  let cx = 0,
    cy = 0,
    sx = 0,
    sy = 0;

  while ((rm = re.exec(d)) !== null) {
    const cmd = rm[1];
    const nums = rm[2]
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);

    switch (cmd) {
      case "M": {
        cx = nums[0];
        cy = nums[1];
        sx = cx;
        sy = cy;
        pts.push([cx, cy]);
        for (let i = 2; i < nums.length; i += 2) {
          cx = nums[i];
          cy = nums[i + 1];
          pts.push([cx, cy]);
        }
        break;
      }
      case "L":
        for (let i = 0; i < nums.length; i += 2) {
          cx = nums[i];
          cy = nums[i + 1];
          pts.push([cx, cy]);
        }
        break;
      case "Q": {
        const x0 = cx,
          y0 = cy;
        for (let i = 0; i < nums.length; i += 4) {
          const qx = nums[i],
            qy = nums[i + 1],
            x = nums[i + 2],
            y = nums[i + 3];
          for (let s = 1; s <= subdivQ; s++) {
            const t = s / subdivQ;
            const omt = 1 - t;
            const px = omt * omt * x0 + 2 * omt * t * qx + t * t * x;
            const py = omt * omt * y0 + 2 * omt * t * qy + t * t * y;
            pts.push([px, py]);
          }
          cx = x;
          cy = y;
        }
        break;
      }
      case "Z":
        pts.push([sx, sy]);
        break;
      default:
        throw new Error(`unsupported path command ${cmd}`);
    }
  }
  return pts;
}

function norm([x, y]) {
  const l = Math.hypot(x, y) || 1;
  return [x / l, y / l];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function thinRing(ring, dotMinStraight) {
  let pts = ring.slice();
  if (
    pts.length >= 2 &&
    pts[0][0] === pts[pts.length - 1][0] &&
    pts[0][1] === pts[pts.length - 1][1]
  ) {
    pts.pop();
  }
  if (pts.length < 4) return pts;
  let trimmed = true;
  while (trimmed && pts.length > 16) {
    trimmed = false;
    const next = [];
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const prev = pts[(i - 1 + n) % n];
      const cur = pts[i];
      const nxt = pts[(i + 1) % n];
      const v1 = norm([cur[0] - prev[0], cur[1] - prev[1]]);
      const v2 = norm([nxt[0] - cur[0], nxt[1] - cur[1]]);
      if (dot(v1, v2) < dotMinStraight) next.push(cur);
      else trimmed = true;
    }
    pts = next;
  }
  return pts;
}

/** Closed Catmull–Rom (uniform) → contiguous cubic Béziers passing through verts. */
function catmullToPathD(ring) {
  const n = ring.length;
  if (n < 3) throw new Error("need ≥3 verts");
  const p = ring.map(([x, y]) => [x, y]);
  /** @returns {[number,number]} */
  const at = (i) => {
    let k = i % n;
    if (k < 0) k += n;
    return p[k];
  };

  let d = "";
  const p0start = at(0);
  d += `M ${p0start[0].toFixed(4)} ${p0start[1].toFixed(4)}`;

  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(4)} ${c1[1].toFixed(4)} ${c2[0].toFixed(4)} ${c2[1].toFixed(4)} ${p2[0].toFixed(4)} ${p2[1].toFixed(4)}`;
  }
  d += " Z";
  return d;
}

function smoothPath(d, subdiv, dotMinStraight) {
  const pts = flattenPath(d, subdiv);
  const thin = thinRing(pts, dotMinStraight);
  return catmullToPathD(thin);
}

const dotMinStraight = 0.9935;

const smoothed = paths.map(({ fill, d }) => ({
  fill,
  d: smoothPath(d, 36, dotMinStraight),
}));

const out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 26 134 74" fill="none" role="img" aria-label="MemoryBinder">
  <title>MemoryBinder</title>
  <g stroke="none">
${smoothed.map((p) => `    <path fill="${p.fill}" d="${p.d}"/>`).join("\n")}
  </g>
</svg>
`;

fs.writeFileSync(path.resolve("apps/web/public/icon.svg"), out);
console.log("Updated apps/web/public/icon.svg (collinearThin + Catmull–Rom cubics).");
