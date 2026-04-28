import groq from "groq";

// =============================================================================
// POSTS
// =============================================================================

// Shared post fields projection
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  pubDate,
  tags,
  isRecent,
  isPopular,
  isLocked,
  image {
    asset->,
    alt
  },
  "author": author->slug.current
`;

// All posts (for listing)
export const allPostsQuery = groq`
  *[_type == "post"] | order(pubDate desc) {
    ${postFields},
    "body": pt::text(body)
  }
`;

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

// Posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && $tag in tags] | order(pubDate desc) {
    ${postFields},
    "body": pt::text(body)
  }
`;

// All unique tags
export const allTagsQuery = groq`
  array::unique(*[_type == "post" && defined(tags)].tags[])
`;

// Related posts (by tags, excluding current)
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && count((tags)[@ in $tags]) > 0] | order(pubDate desc) [0...3] {
    ${postFields},
    "body": pt::text(body)
  }
`;

// =============================================================================
// AUTHORS
// =============================================================================

const authorFields = groq`
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  image {
    asset->,
    alt
  },
  socials
`;

export const allAuthorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    ${authorFields}
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    ${authorFields}
  }
`;

// =============================================================================
// PODCAST
// =============================================================================

const podcastFields = groq`
  _id,
  title,
  "slug": slug.current,
  pubDate,
  description,
  "author": author->slug.current,
  image {
    asset->,
    alt
  },
  guestAvatar {
    asset->,
    alt
  },
  episodeNumber,
  duration,
  audioSrc,
  tags,
  isRecent,
  isPopular,
  isLocked,
  body
`;

export const allPodcastsQuery = groq`
  *[_type == "podcast"] | order(pubDate desc) {
    ${podcastFields}
  }
`;

export const podcastBySlugQuery = groq`
  *[_type == "podcast" && slug.current == $slug][0] {
    ${podcastFields}
  }
`;

export const podcastsByTagQuery = groq`
  *[_type == "podcast" && $tag in tags] | order(pubDate desc) {
    ${podcastFields}
  }
`;

export const allPodcastTagsQuery = groq`
  array::unique(*[_type == "podcast"].tags[])
`;

// =============================================================================
// LEGAL PAGES
// =============================================================================

const legalPageFields = groq`
  _id,
  page,
  "slug": slug.current,
  pubDate
`;

export const allLegalPagesQuery = groq`
  *[_type == "legalPage"] {
    ${legalPageFields}
  }
`;

export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    ${legalPageFields},
    body
  }
`;

// =============================================================================
// PRODUCTS
// =============================================================================

const productFields = groq`
  _id,
  title,
  "slug": slug.current,
  shortName,
  subtitle,
  "order": coalesce(order, 99),
  description,
  ctaText,
  image {
    asset->,
    alt
  },
  steps[] {
    label,
    description
  },
  pullQuote {
    text,
    cite
  },
  caseStudy {
    label,
    title,
    description,
    metrics[] {
      label,
      value
    }
  }
`;

export const allProductsQuery = groq`
  *[_type == "product"] | order(order asc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields},
    body
  }
`;

// =============================================================================
// SERVICES
// =============================================================================

const serviceFields = groq`
  _id,
  title,
  "slug": slug.current,
  shortName,
  subtitle,
  "order": coalesce(order, 99),
  description,
  ctaText,
  image {
    asset->,
    alt
  },
  steps[] {
    label,
    description
  },
  pullQuote {
    text,
    cite
  },
  caseStudy {
    label,
    title,
    description,
    metrics[] {
      label,
      value
    }
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    ${serviceFields}
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    ${serviceFields},
    body
  }
`;

// =============================================================================
// PAGES (generic editable pages)
// =============================================================================

const pageFields = groq`
  _id,
  title,
  "slug": slug.current,
  label,
  description,
  image {
    asset->,
    alt
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(title asc) {
    ${pageFields}
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ${pageFields},
    body
  }
`;

// =============================================================================
// STRUCTURED PAGES
// =============================================================================

export const commitmentsPageQuery = groq`
  *[_id == "commitments-page" && _type == "commitmentsPage"][0] {
    _id,
    title,
    label,
    description,
    image {
      asset->,
      alt
    },
    commitments[] {
      number,
      title,
      body
    }
  }
`;

export const registryPageQuery = groq`
  *[_id == "registry-page" && _type == "registryPage"][0] {
    _id,
    title,
    label,
    description,
    primaryCta,
    introSection {
      label,
      paragraphs[] {
        text
      }
    },
    capabilitiesLabel,
    capabilities[] {
      label,
      description
    },
    architecture {
      label,
      description,
      image {
        asset->,
        alt
      },
      layers[] {
        label,
        value
      }
    },
    principlesLabel,
    principles[] {
      number,
      title,
      description
    },
    audience {
      label,
      paragraphs[] {
        text
      },
      cards[] {
        label,
        description
      }
    },
    practice {
      label,
      paragraphs[] {
        text
      }
    },
    pullQuote {
      text,
      cite
    },
    cta {
      label,
      description,
      primaryLink,
      secondaryLink
    }
  }
`;

// =============================================================================
// BLOG POSTS
// =============================================================================

const blogPostFields = groq`
  _id,
  _createdAt,
  headline,
  "slug": slug.current,
  subheadline,
  publishedAt,
  heroImage {
    asset->,
    alt
  }
`;

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    ${blogPostFields}
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${blogPostFields},
    body
  }
`;

// =============================================================================
// NEWS POSTS (announcements, etc.)
// =============================================================================

const newsPostFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  excerpt,
  image {
    asset->,
    alt
  },
  featured
`;

export const allNewsPostsQuery = groq`
  *[_type == "newsPost"] | order(publishedAt desc) {
    ${newsPostFields}
  }
`;

export const newsPostsByCategoryQuery = groq`
  *[_type == "newsPost" && category == $category] | order(publishedAt desc) {
    ${newsPostFields}
  }
`;

export const newsPostBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    ${newsPostFields},
    body
  }
`;

// =============================================================================
// PUBLICATIONS
// =============================================================================

const publicationFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  authors,
  abstract,
  image {
    asset->,
    alt
  },
  href,
  downloadUrl
`;

export const allPublicationsQuery = groq`
  *[_type == "publication"] | order(publishedAt desc) {
    ${publicationFields}
  }
`;

export const publicationsByCategoryQuery = groq`
  *[_type == "publication" && category == $category] | order(publishedAt desc) {
    ${publicationFields}
  }
`;

export const publicationBySlugQuery = groq`
  *[_type == "publication" && slug.current == $slug][0] {
    ${publicationFields},
    body
  }
`;

// =============================================================================
// SITE SETTINGS
// =============================================================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    siteUrl,
    ogImage {
      asset->,
      alt
    },
    twitterHandle,
    navigation[] {
      label,
      href
    },
    footer {
      text,
      links[] {
        label,
        href
      }
    },
    socials[] {
      platform,
      url
    }
  }
`;
