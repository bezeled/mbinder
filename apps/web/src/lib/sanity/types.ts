import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityImage {
  asset: SanityImageSource;
  alt?: string;
}

// =============================================================================
// LEGAL PAGES
// =============================================================================

export interface SanityLegalPage {
  _id: string;
  page: string;
  slug: string;
  pubDate: string;
  body?: PortableTextBlock[];
}

export interface LegalPage {
  slug: string;
  data: {
    page: string;
    pubDate: Date;
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// BLOG POSTS
// =============================================================================

export interface SanityBlogPost {
  _id: string;
  _createdAt: string;
  headline: string;
  slug: string;
  subheadline: string;
  publishedAt: string;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
}

export interface BlogPost {
  slug: string;
  data: {
    headline: string;
    subheadline: string;
    publishedAt: Date;
    heroImage?: {
      url: string;
      alt: string;
    };
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// NEWS POSTS (announcements)
// =============================================================================

export interface SanityNewsPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt?: string;
  image?: SanityImage;
  featured?: boolean;
  body?: PortableTextBlock[];
}

export interface NewsPost {
  slug: string;
  data: {
    title: string;
    category: string;
    publishedAt: Date;
    excerpt?: string;
    image?: {
      url: string;
      alt: string;
    };
    featured?: boolean;
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// SITE SETTINGS
// =============================================================================

export interface SiteSettings {
  title?: string;
  description?: string;
  siteUrl?: string;
  ogImage?: SanityImage;
  twitterHandle?: string;
  navigation?: Array<{
    label: string;
    href: string;
  }>;
  footer?: {
    text?: string;
    links?: Array<{
      label: string;
      href: string;
    }>;
  };
  socials?: Array<{
    platform: string;
    url: string;
  }>;
}
