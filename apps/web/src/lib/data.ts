/**
 * Unified Data Layer
 *
 * This module provides a single interface to fetch content from either:
 * - Sanity CMS (when USE_SANITY = true)
 * - Astro Content Collections (when USE_SANITY = false)
 *
 * Components always receive the same data shape regardless of the source.
 */

import { getCollection, getEntry } from "astro:content";
import {
  sanityFetch,
  allProductsQuery,
  productBySlugQuery,
  allServicesQuery,
  serviceBySlugQuery,
  allPagesQuery,
  pageBySlugQuery,
  commitmentsPageQuery,
  registryPageQuery,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  allNewsPostsQuery,
  newsPostsByCategoryQuery,
  newsPostBySlugQuery,
  allPublicationsQuery,
  publicationsByCategoryQuery,
  publicationBySlugQuery,
  transformProduct,
  transformService,
  transformPage,
  transformBlogPost,
  transformNewsPost,
  transformPublication,
} from "./sanity";
import type {
  SanityProduct,
  SanityService,
  SanityPage,
  SanityBlogPost,
  SanityNewsPost,
  SanityPublication,
  SanityCommitmentsPage,
  SanityRegistryPage,
} from "./sanity";

/**
 * Toggle this to switch between Sanity CMS and Astro Content Collections
 * - true: Use Sanity CMS as the data source
 * - false: Use Astro Content Collections (markdown files)
 */
export const USE_SANITY = true;

function ensureArray<T>(value: T[] | T | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function ensureDocument<T>(value: T[] | T | null | undefined): T | null {
  if (!value || Array.isArray(value)) {
    return null;
  }

  return value;
}

// =============================================================================
// LEGAL PAGES (always Astro Content Collections — markdown in src/content/legal)
// Re-enable Sanity when policies are migrated; until then they are hardcoded here.
// =============================================================================

export async function getAllLegalPages() {
  const pages = await getCollection("legal");
  return pages.map((page) => ({
    slug: page.slug,
    data: page.data,
    body: page.body,
  }));
}

export async function getLegalPageBySlug(slug: string) {
  const page = await getEntry("legal", slug);
  return page ? { slug: page.slug, data: page.data, body: page.body } : null;
}

// =============================================================================
// PRODUCTS / SERVICES
// =============================================================================

export async function getAllProducts() {
  if (USE_SANITY) {
    const products = ensureArray(
      await sanityFetch<SanityProduct[]>(allProductsQuery)
    );
    return products.map(transformProduct);
  }
  return [];
}

export async function getProductBySlug(slug: string) {
  if (USE_SANITY) {
    const product = ensureDocument(
      await sanityFetch<SanityProduct>(productBySlugQuery, {
        slug,
      })
    );
    return product ? transformProduct(product) : null;
  }
  return null;
}

export async function getAllServices() {
  if (USE_SANITY) {
    const services = ensureArray(
      await sanityFetch<SanityService[]>(allServicesQuery)
    );
    return services.map(transformService);
  }
  return [];
}

export async function getServiceBySlug(slug: string) {
  if (USE_SANITY) {
    const service = ensureDocument(
      await sanityFetch<SanityService>(serviceBySlugQuery, {
        slug,
      })
    );
    return service ? transformService(service) : null;
  }
  return null;
}

// =============================================================================
// PAGES (generic editable pages)
// =============================================================================

export async function getAllPages() {
  if (USE_SANITY) {
    const pages = ensureArray(await sanityFetch<SanityPage[]>(allPagesQuery));
    return pages.map(transformPage);
  }
  return [];
}

export async function getPageBySlug(slug: string) {
  if (USE_SANITY) {
    const page = ensureDocument(
      await sanityFetch<SanityPage>(pageBySlugQuery, { slug })
    );
    return page ? transformPage(page) : null;
  }
  return null;
}

export async function getCommitmentsPage() {
  if (USE_SANITY) {
    return ensureDocument(
      await sanityFetch<SanityCommitmentsPage>(commitmentsPageQuery)
    );
  }
  return null;
}

export async function getRegistryPage() {
  if (USE_SANITY) {
    return ensureDocument(await sanityFetch<SanityRegistryPage>(registryPageQuery));
  }
  return null;
}

// =============================================================================
// BLOG POSTS
// =============================================================================

export async function getAllBlogPosts() {
  if (USE_SANITY) {
    const posts = ensureArray(
      await sanityFetch<SanityBlogPost[]>(allBlogPostsQuery)
    );
    return posts.map(transformBlogPost);
  }
  return [];
}

export async function getBlogPostBySlug(slug: string) {
  if (USE_SANITY) {
    const post = ensureDocument(
      await sanityFetch<SanityBlogPost>(blogPostBySlugQuery, {
        slug,
      })
    );
    return post ? transformBlogPost(post) : null;
  }
  return null;
}

// =============================================================================
// NEWS POSTS (announcements)
// =============================================================================

export async function getAllNewsPosts() {
  if (USE_SANITY) {
    const posts = ensureArray(
      await sanityFetch<SanityNewsPost[]>(allNewsPostsQuery)
    );
    return posts.map(transformNewsPost);
  }
  return [];
}

export async function getNewsPostsByCategory(category: string) {
  if (USE_SANITY) {
    const posts = ensureArray(
      await sanityFetch<SanityNewsPost[]>(newsPostsByCategoryQuery, {
        category,
      })
    );
    return posts.map(transformNewsPost);
  }
  return [];
}

export async function getNewsPostBySlug(slug: string) {
  if (USE_SANITY) {
    const post = ensureDocument(
      await sanityFetch<SanityNewsPost>(newsPostBySlugQuery, {
        slug,
      })
    );
    return post ? transformNewsPost(post) : null;
  }
  return null;
}

// =============================================================================
// PUBLICATIONS
// =============================================================================

export async function getAllPublications() {
  if (USE_SANITY) {
    const pubs = ensureArray(
      await sanityFetch<SanityPublication[]>(allPublicationsQuery)
    );
    return pubs.map(transformPublication);
  }
  return [];
}

export async function getPublicationsByCategory(category: string) {
  if (USE_SANITY) {
    const pubs = ensureArray(
      await sanityFetch<SanityPublication[]>(publicationsByCategoryQuery, {
        category,
      })
    );
    return pubs.map(transformPublication);
  }
  return [];
}

export async function getPublicationBySlug(slug: string) {
  if (USE_SANITY) {
    const pub = ensureDocument(
      await sanityFetch<SanityPublication>(publicationBySlugQuery, {
        slug,
      })
    );
    return pub ? transformPublication(pub) : null;
  }
  return null;
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Sort items by pubDate descending (newest first)
 */
export function sortByDate<T extends { data: { pubDate: Date | string } }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const dateA =
      a.data.pubDate instanceof Date
        ? a.data.pubDate
        : new Date(a.data.pubDate);
    const dateB =
      b.data.pubDate instanceof Date
        ? b.data.pubDate
        : new Date(b.data.pubDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Filter items that have pubDate
 */
export function filterWithDate<T extends { data: { pubDate?: Date | string } }>(
  items: T[]
): T[] {
  return items.filter((item) => item.data?.pubDate);
}
