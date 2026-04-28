import { legalPage } from "./legalPage";
import { siteSettings } from "./siteSettings";
import { blogPost } from "./blogPost";
import { newsPost } from "./newsPost";
import { publication } from "./publication";
import { product } from "./product";
import { service } from "./service";
import { page } from "./page";
import { commitmentsPage } from "./commitmentsPage";
import { registryPage } from "./registryPage";

export const schemaTypes = [
  product,
  service,
  page,
  commitmentsPage,
  registryPage,
  blogPost,
  legalPage,
  newsPost,
  publication,
  siteSettings,
];
