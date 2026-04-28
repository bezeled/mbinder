/**
 * Defaults for `SiteImage` (Astro + Sharp). `max` maps to quality 100 in the sharp service.
 * Raster output format defaults to JPEG in `SiteImage.astro` (Astro’s default is WebP).
 */
export const IMAGE_QUALITY = "max" as const;

/** ~260px float accent × 3× DPR */
export const SRC_WIDTHS_FLOAT = [520, 780, 1040, 1400, 1800];

/** ~half column (e.g. 45vw) editorial */
export const SRC_WIDTHS_HALF = [640, 960, 1280, 1600, 1920];

/** ~third column (e.g. 30vw) */
export const SRC_WIDTHS_THIRD = [640, 960, 1280, 1600];

/** Book / card covers */
export const SRC_WIDTHS_COVER = [480, 720, 960, 1280];

/** Full-bleed strips & large heroes */
export const SRC_WIDTHS_FULL = [800, 1200, 1600, 1920, 2560, 3200];

/** Narrow float / split column accents */
export const SRC_WIDTHS_NARROW = [480, 720, 960, 1280, 1600];
