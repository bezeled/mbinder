import { createClient } from "@sanity/client";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || "production";
const apiVersion = import.meta.env.SANITY_API_VERSION || "2024-01-01";

export const sanityConfigured = Boolean(projectId);

if (!sanityConfigured && import.meta.env.DEV) {
  console.warn(
    "[memorybinder] SANITY_PROJECT_ID is not set — Sanity-driven pages " +
      "(blog, announcements) will render empty. Create a NEW memorybinder " +
      "Sanity project (do not reuse nooriam) and set SANITY_PROJECT_ID.",
  );
}

export const client = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
      token: import.meta.env.SANITY_READ_TOKEN,
    })
  : null;
