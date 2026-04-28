import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "[memorybinder] SANITY_STUDIO_PROJECT_ID is not set. " +
      "Create a fresh Sanity project for memorybinder (https://sanity.io/manage), " +
      "then put the new projectId in apps/studio/.env. " +
      "Do NOT reuse the nooriam project.",
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
