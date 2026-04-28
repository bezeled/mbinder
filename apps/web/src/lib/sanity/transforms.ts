import { getImageUrl } from "./image";
import type {
  SanityLegalPage,
  SanityBlogPost,
  SanityNewsPost,
  LegalPage,
  BlogPost,
  NewsPost,
} from "./types";

export function transformLegalPage(page: SanityLegalPage): LegalPage {
  return {
    slug: page.slug,
    data: {
      page: page.page,
      pubDate: new Date(page.pubDate),
    },
    body: page.body,
  };
}

export function transformBlogPost(post: SanityBlogPost): BlogPost {
  return {
    slug: post.slug,
    data: {
      headline: post.headline,
      subheadline: post.subheadline,
      publishedAt: new Date(post.publishedAt),
      heroImage: post.heroImage
        ? {
            url: getImageUrl(post.heroImage.asset),
            alt: post.heroImage.alt || post.headline || "",
          }
        : undefined,
    },
    body: post.body,
  };
}

export function transformNewsPost(post: SanityNewsPost): NewsPost {
  return {
    slug: post.slug,
    data: {
      title: post.title,
      category: post.category,
      publishedAt: new Date(post.publishedAt),
      excerpt: post.excerpt,
      image: post.image
        ? {
            url: getImageUrl(post.image.asset),
            alt: post.image.alt || post.title || "",
          }
        : undefined,
      featured: post.featured,
    },
    body: post.body,
  };
}
