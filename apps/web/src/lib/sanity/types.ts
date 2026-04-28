import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// =============================================================================
// IMAGE TYPES
// =============================================================================

export interface SanityImage {
  asset: SanityImageSource;
  alt?: string;
}

// =============================================================================
// POST TYPES
// =============================================================================

/**
 * Post data as returned from Sanity queries
 */
export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  tags: string[];
  isRecent?: boolean;
  isPopular?: boolean;
  isLocked?: boolean;
  image: SanityImage;
  author?: string;
  body: PortableTextBlock[] | string;
}

/**
 * Post shape expected by UI components (mirrors original Astro content collection shape)
 */
export interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    isRecent?: boolean;
    isPopular?: boolean;
    isLocked?: boolean;
    author?: string;
    image: {
      url: string;
      alt: string;
    };
  };
  body: string;
}

// =============================================================================
// AUTHOR TYPES
// =============================================================================

export interface SanityAuthor {
  _id: string;
  name: string;
  slug?: string;
  role?: string;
  bio?: string;
  image: SanityImage;
  socials?: {
    twitter?: string;
    website?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Author {
  slug: string;
  data: {
    name: string;
    role?: string;
    bio?: string;
    image: {
      url: string;
      alt: string;
    };
    socials?: {
      twitter?: string;
      website?: string;
      linkedin?: string;
      email?: string;
    };
  };
}

// =============================================================================
// PODCAST TYPES
// =============================================================================

export interface SanityPodcast {
  _id: string;
  title: string;
  slug?: string;
  pubDate: string;
  description: string;
  author: string;
  image: SanityImage;
  guestAvatar: SanityImage;
  episodeNumber?: number;
  duration?: string;
  audioSrc?: string;
  tags: string[];
  isRecent?: boolean;
  isPopular?: boolean;
  isLocked?: boolean;
  body?: PortableTextBlock[];
}

export interface Podcast {
  slug: string;
  data: {
    title: string;
    pubDate: Date;
    description: string;
    author: string;
    image: {
      url: string;
      alt: string;
    };
    guestAvatar: {
      url: string;
      alt: string;
    };
    episodeNumber?: number;
    duration?: string;
    audioSrc?: string;
    tags: string[];
    isRecent?: boolean;
    isPopular?: boolean;
    isLocked?: boolean;
  };
  body?: PortableTextBlock[] | string;
}

// =============================================================================
// TEAM MEMBER TYPES
// =============================================================================

export interface SanityTeamMember {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: PortableTextBlock[];
  image: SanityImage;
  socials?: Array<{
    label: string;
    href: string;
  }>;
  body?: PortableTextBlock[];
}

export interface TeamMember {
  slug: string;
  data: {
    name: string;
    role?: string;
    bio?: string;
    image: {
      url: string;
      alt: string;
    };
    socials?: Array<{
      label: string;
      href: string;
    }>;
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// LEGAL PAGE TYPES
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
// PRODUCT / SERVICE TYPES
// =============================================================================

export interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  shortName: string;
  subtitle?: string;
  order: number;
  description?: string;
  ctaText?: string;
  image?: SanityImage;
  steps?: Array<{
    label: string;
    description: string;
  }>;
  body?: PortableTextBlock[];
  pullQuote?: {
    text: string;
    cite: string;
  };
  caseStudy?: {
    label: string;
    title: string;
    description: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
  };
}

export interface Product {
  slug: string;
  data: {
    title: string;
    shortName: string;
    subtitle?: string;
    order: number;
    description?: string;
    ctaText?: string;
    image?: {
      url: string;
      alt: string;
    };
    steps?: Array<{
      label: string;
      description: string;
    }>;
    pullQuote?: {
      text: string;
      cite: string;
    };
    caseStudy?: {
      label: string;
      title: string;
      description: string;
      metrics?: Array<{
        label: string;
        value: string;
      }>;
    };
  };
  body?: PortableTextBlock[];
}

export interface SanityService {
  _id: string;
  title: string;
  slug: string;
  shortName: string;
  subtitle?: string;
  order: number;
  description?: string;
  ctaText?: string;
  image?: SanityImage;
  steps?: Array<{
    label: string;
    description: string;
  }>;
  body?: PortableTextBlock[];
  pullQuote?: {
    text: string;
    cite: string;
  };
  caseStudy?: {
    label: string;
    title: string;
    description: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
  };
}

export interface Service {
  slug: string;
  data: {
    title: string;
    shortName: string;
    subtitle?: string;
    order: number;
    description?: string;
    ctaText?: string;
    image?: {
      url: string;
      alt: string;
    };
    steps?: Array<{
      label: string;
      description: string;
    }>;
    pullQuote?: {
      text: string;
      cite: string;
    };
    caseStudy?: {
      label: string;
      title: string;
      description: string;
      metrics?: Array<{
        label: string;
        value: string;
      }>;
    };
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// PAGE TYPES (generic editable pages)
// =============================================================================

export interface SanityPage {
  _id: string;
  title: string;
  slug: string;
  label?: string;
  description?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];
}

export interface Page {
  slug: string;
  data: {
    title: string;
    label?: string;
    description?: string;
    image?: {
      url: string;
      alt: string;
    };
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// STRUCTURED PAGE TYPES
// =============================================================================

export interface SanityTextParagraph {
  text: string;
}

export interface SanityLink {
  label?: string;
  href?: string;
}

export interface SanityLabeledCard {
  label: string;
  description: string;
}

export interface SanityNumberedCard {
  number: string;
  title: string;
  description: string;
}

export interface SanityCommitment {
  number: string;
  title: string;
  body: string;
}

export interface SanityCommitmentsPage {
  _id: string;
  title: string;
  label: string;
  description: string;
  image: SanityImage;
  commitments: SanityCommitment[];
}

export interface SanityRegistryPage {
  _id: string;
  title: string;
  label: string;
  description: string;
  primaryCta?: SanityLink;
  introSection?: {
    label: string;
    paragraphs: SanityTextParagraph[];
  };
  capabilitiesLabel: string;
  capabilities: SanityLabeledCard[];
  architecture?: {
    label: string;
    description: string;
    image: SanityImage;
    layers: Array<{
      label: string;
      value: string;
    }>;
  };
  principlesLabel: string;
  principles: SanityNumberedCard[];
  audience?: {
    label: string;
    paragraphs: SanityTextParagraph[];
    cards: SanityLabeledCard[];
  };
  practice?: {
    label: string;
    paragraphs: SanityTextParagraph[];
  };
  pullQuote?: {
    text: string;
    cite: string;
  };
  cta?: {
    label: string;
    description: string;
    primaryLink?: SanityLink;
    secondaryLink?: SanityLink;
  };
}

// =============================================================================
// BLOG POST TYPES
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
// NEWS POST TYPES
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
// PUBLICATION TYPES
// =============================================================================

export interface SanityPublication {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  authors?: string[];
  abstract?: string;
  image?: SanityImage;
  href?: string;
  downloadUrl?: string;
  body?: PortableTextBlock[];
}

export interface Publication {
  slug: string;
  data: {
    title: string;
    category: string;
    publishedAt: Date;
    authors?: string[];
    abstract?: string;
    image?: {
      url: string;
      alt: string;
    };
    href?: string;
    downloadUrl?: string;
  };
  body?: PortableTextBlock[];
}

// =============================================================================
// SITE SETTINGS TYPES
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
