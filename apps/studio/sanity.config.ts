import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "[memorybinder] SANITY_STUDIO_PROJECT_ID is not set. " +
      "Create a fresh Sanity project for memorybinder (https://sanity.io/manage), " +
      "then put the new projectId in apps/studio/.env. " +
      "Do NOT reuse the nooriam project.",
  );
}

export default defineConfig({
  name: "memorybinder",
  title: "MemoryBinder CMS",

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
