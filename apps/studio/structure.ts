import type { StructureBuilder } from "sanity/structure";
import {
  DocumentIcon,
  DocumentTextIcon,
  CogIcon,
} from "@sanity/icons";

const SITE_SETTINGS_ID = "siteSettings";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("MemoryBinder")
    .items([
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .schemaType("blogPost")
        .child(S.documentTypeList("blogPost").title("Blog posts")),

      S.listItem()
        .title("Announcements")
        .icon(DocumentIcon)
        .schemaType("newsPost")
        .child(S.documentTypeList("newsPost").title("Announcements")),

      S.listItem()
        .title("Legal")
        .icon(DocumentTextIcon)
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Legal pages")),

      S.divider(),

      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_ID)
            .title("Site settings")
        ),
    ]);
