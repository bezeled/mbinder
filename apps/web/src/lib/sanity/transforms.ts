import { getImageUrl } from "./image";
import { portableTextToPlainText } from "./portableText";
import type {
  SanityPost,
  SanityTeamMember,
  SanityLegalPage,
  SanityAuthor,
  SanityPodcast,
  SanityProduct,
  SanityService,
  SanityPage,
  SanityBlogPost,
  SanityNewsPost,
  SanityPublication,
  Post,
  TeamMember,
  LegalPage,
  Product,
  Service,
  Page,
  BlogPost,
  NewsPost,
  Publication,
} from "./types";

/**
 * Transform Sanity post to UI-friendly shape
 * Matches the original Astro content collection structure
 */
export function transformPost(post: SanityPost): Post {
  return {
    slug: post.slug,
    data: {
      title: post.title,
      description: post.description,
      pubDate: new Date(post.pubDate),
      tags: post.tags || [],
      isRecent: post.isRecent,
      isPopular: post.isPopular,
      isLocked: post.isLocked,
      author: post.author || "",
      image: {
        url: getImageUrl(post.image?.asset),
        alt: post.image?.alt || post.title || "",
      },
    },
    // Body is plain text (from pt::text) for reading time calculation
    body: typeof post.body === "string" ? post.body : "",
  };
}

/**
 * Transform Sanity author to UI-friendly shape
 * Matches the original Astro content collection structure
 */
export function transformAuthor(author: SanityAuthor): any {
  return {
    slug: author.slug || author.name?.toLowerCase().replace(/\s+/g, "-") || "",
    data: {
      name: author.name,
      role: author.role,
      bio: author.bio,
      image: {
        url: getImageUrl(author.image?.asset),
        alt: author.image?.alt || author.name || "",
      },
      socials: author.socials,
    },
  };
}

/**
 * Transform Sanity podcast to UI-friendly shape
 * Matches the original Astro content collection structure
 */
export function transformPodcast(podcast: SanityPodcast): any {
  return {
    slug:
      podcast.slug || podcast.title?.toLowerCase().replace(/\s+/g, "-") || "",
    data: {
      title: podcast.title,
      pubDate: new Date(podcast.pubDate),
      description: podcast.description,
      author: podcast.author || "",
      image: {
        url: getImageUrl(podcast.image?.asset),
        alt: podcast.image?.alt || podcast.title || "",
      },
      guestAvatar: {
        url: getImageUrl(podcast.guestAvatar?.asset),
        alt: podcast.guestAvatar?.alt || "",
      },
      episodeNumber: podcast.episodeNumber,
      duration: podcast.duration,
      audioSrc: podcast.audioSrc,
      tags: podcast.tags || [],
      isRecent: podcast.isRecent,
      isPopular: podcast.isPopular,
      isLocked: podcast.isLocked,
    },
    body: podcast.body,
  };
}

/**
 * Transform Sanity team member to UI-friendly shape
 */
export function transformTeamMember(member: SanityTeamMember): TeamMember {
  return {
    slug: member.slug,
    data: {
      name: member.name,
      role: member.role,
      // Convert bio to plain text for display in layout
      bio: member.bio ? portableTextToPlainText(member.bio) : "",
      image: {
        url: getImageUrl(member.image?.asset),
        alt: member.image?.alt || member.name || "",
      },
      socials: member.socials,
    },
    body: member.body,
  };
}

/**
 * Transform Sanity legal page to UI-friendly shape
 */
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

/**
 * Transform Sanity product to UI-friendly shape
 */
export function transformProduct(product: SanityProduct): Product {
  return {
    slug: product.slug,
    data: {
      title: product.title,
      shortName: product.shortName,
      subtitle: product.subtitle,
      order: product.order,
      description: product.description,
      ctaText: product.ctaText,
      image: product.image
        ? {
            url: getImageUrl(product.image.asset),
            alt: product.image.alt || product.title || "",
          }
        : undefined,
      steps: product.steps,
      pullQuote: product.pullQuote,
      caseStudy: product.caseStudy,
    },
    body: product.body,
  };
}

export function transformService(service: SanityService): Service {
  return {
    slug: service.slug,
    data: {
      title: service.title,
      shortName: service.shortName,
      subtitle: service.subtitle,
      order: service.order,
      description: service.description,
      ctaText: service.ctaText,
      image: service.image
        ? {
            url: getImageUrl(service.image.asset),
            alt: service.image.alt || service.title || "",
          }
        : undefined,
      steps: service.steps,
      pullQuote: service.pullQuote,
      caseStudy: service.caseStudy,
    },
    body: service.body,
  };
}

/**
 * Transform Sanity page to UI-friendly shape
 */
export function transformPage(page: SanityPage): Page {
  return {
    slug: page.slug,
    data: {
      title: page.title,
      label: page.label,
      description: page.description,
      image: page.image
        ? {
            url: getImageUrl(page.image.asset),
            alt: page.image.alt || page.title || "",
          }
        : undefined,
    },
    body: page.body,
  };
}

/**
 * Transform Sanity blog post to UI-friendly shape
 */
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

/**
 * Transform Sanity news post to UI-friendly shape
 */
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

/**
 * Transform Sanity publication to UI-friendly shape
 */
export function transformPublication(pub: SanityPublication): Publication {
  return {
    slug: pub.slug,
    data: {
      title: pub.title,
      category: pub.category,
      publishedAt: new Date(pub.publishedAt),
      authors: pub.authors,
      abstract: pub.abstract,
      image: pub.image
        ? {
            url: getImageUrl(pub.image.asset),
            alt: pub.image.alt || pub.title || "",
          }
        : undefined,
      href: pub.href,
      downloadUrl: pub.downloadUrl,
    },
    body: pub.body,
  };
}
