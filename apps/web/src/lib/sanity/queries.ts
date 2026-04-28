import groq from "groq";

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
// NEWS POSTS (announcements)
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

export const newsPostBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    ${newsPostFields},
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
