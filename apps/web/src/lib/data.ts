/**
 * Unified data layer.
 *
 * Legal pages come from Astro content collections (markdown in
 * `src/content/legal`). Blog posts and announcements come from Sanity
 * — the helpers here gracefully return empty arrays / null when Sanity
 * isn't configured.
 */

import { getCollection, getEntry } from "astro:content";
import {
  sanityFetch,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  allNewsPostsQuery,
  newsPostBySlugQuery,
  transformBlogPost,
  transformNewsPost,
} from "./sanity";
import type { SanityBlogPost, SanityNewsPost } from "./sanity";

function ensureArray<T>(value: T[] | T | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function ensureDocument<T>(value: T[] | T | null | undefined): T | null {
  if (!value || Array.isArray(value)) return null;
  return value;
}

// =============================================================================
// LEGAL PAGES (markdown)
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
// BLOG (Sanity)
// =============================================================================

export async function getAllBlogPosts() {
  const posts = ensureArray(
    await sanityFetch<SanityBlogPost[]>(allBlogPostsQuery)
  );
  return posts.map(transformBlogPost);
}

export async function getBlogPostBySlug(slug: string) {
  const post = ensureDocument(
    await sanityFetch<SanityBlogPost>(blogPostBySlugQuery, { slug })
  );
  return post ? transformBlogPost(post) : null;
}

// =============================================================================
// ANNOUNCEMENTS (Sanity)
// =============================================================================

export async function getAllNewsPosts() {
  const posts = ensureArray(
    await sanityFetch<SanityNewsPost[]>(allNewsPostsQuery)
  );
  return posts.map(transformNewsPost);
}

export async function getNewsPostBySlug(slug: string) {
  const post = ensureDocument(
    await sanityFetch<SanityNewsPost>(newsPostBySlugQuery, { slug })
  );
  return post ? transformNewsPost(post) : null;
}

// =============================================================================
// HELPERS
// =============================================================================

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
