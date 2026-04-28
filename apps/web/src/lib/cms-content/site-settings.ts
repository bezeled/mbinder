export const siteSettingsSeed = {
  title: "MemoryBinder",
  description:
    "Your story. Your asset. Legally. The legal property infrastructure for personal data, memories, and consumer AI agents.",
  siteUrl: "https://memorybinder.io",
  navigation: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Vision", href: "/vision" },
    { label: "Products", href: "/products" },
    { label: "Learn", href: "/learn" },
    { label: "Trust", href: "/trust" },
    { label: "Blog", href: "/blog" },
  ],
  footer: {
    text: "MemoryBinder Pty Ltd. All rights reserved.",
    links: [
      { label: "Registry", href: "/registry" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
  socials: [] as Array<{ platform: string; url: string }>,
};
