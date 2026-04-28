import type { StructureBuilder } from "sanity/structure";
import {
  DocumentIcon,
  DocumentTextIcon,
  CogIcon,
  ComponentIcon,
  BlockElementIcon,
} from "@sanity/icons";

const SITE_SETTINGS_ID = "siteSettings";
const COMMITMENTS_PAGE_ID = "commitments-page";
const REGISTRY_PAGE_ID = "registry-page";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .icon(ComponentIcon)
        .schemaType("product")
        .child(S.documentTypeList("product").title("Products")),

      S.listItem()
        .title("Services")
        .icon(ComponentIcon)
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),

      S.listItem()
        .title("Pages")
        .icon(BlockElementIcon)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),

      S.listItem()
        .title("Commitments Page")
        .icon(BlockElementIcon)
        .id("commitmentsPage")
        .child(
          S.document()
            .schemaType("commitmentsPage")
            .documentId(COMMITMENTS_PAGE_ID)
            .title("Commitments Page")
        ),

      S.listItem()
        .title("Registry Page")
        .icon(BlockElementIcon)
        .id("registryPage")
        .child(
          S.document()
            .schemaType("registryPage")
            .documentId(REGISTRY_PAGE_ID)
            .title("Registry Page")
        ),

      S.divider(),

      S.listItem()
        .title("Blog Posts")
        .icon(DocumentTextIcon)
        .schemaType("blogPost")
        .child(S.documentTypeList("blogPost").title("Blog Posts")),

      S.listItem()
        .title("News Posts")
        .icon(DocumentIcon)
        .schemaType("newsPost")
        .child(S.documentTypeList("newsPost").title("News Posts")),

      S.listItem()
        .title("Publications")
        .icon(DocumentTextIcon)
        .schemaType("publication")
        .child(S.documentTypeList("publication").title("Publications")),

      S.listItem()
        .title("Legal Pages")
        .icon(DocumentTextIcon)
        .schemaType("legalPage")
        .child(S.documentTypeList("legalPage").title("Legal Pages")),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_ID)
            .title("Site Settings")
        ),
    ]);
