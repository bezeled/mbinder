# MemoryBinder

> Your story. Your asset. Legally.

The web home of **MemoryBinder** — the legal property infrastructure for personal data, memories, and consumer AI agents.

This repository contains:

- **`apps/web`** — the marketing website at [memorybinder.io](https://memorybinder.io) (Astro 5 + Tailwind 4).
- **`apps/studio`** — the Sanity Studio that powers blog and announcements.

## Stack

| | |
| :-- | :-- |
| Web | Astro 5, Tailwind 4, Sanity client |
| Studio | Sanity v5 |
| Hosting | Netlify |
| CMS | Sanity (memorybinder project — see setup below) |

## Sanity setup (do this first)

> ⚠️ **MemoryBinder uses its own Sanity project. Do not point it at the Nooriam project.**
> The studio is a placeholder until a memorybinder project is provisioned.

```bash
# 1. Create a brand-new Sanity project (separate from nooriam)
cd apps/studio
pnpm exec sanity init --create-project "MemoryBinder" --dataset production

# 2. Note the projectId Sanity prints, then put it in two places:
#    apps/studio/.env       SANITY_STUDIO_PROJECT_ID=<new-id>
#    apps/web/.env          SANITY_PROJECT_ID=<new-id>
#
# 3. (Optional) deploy the studio
pnpm exec sanity deploy   # pick a unique studio host, e.g. "memorybinder"
```

Until a project id is set, the web build skips Sanity gracefully and the blog / announcements pages render empty.

## Develop

```bash
pnpm install
pnpm dev:web      # http://localhost:4321
pnpm dev:studio   # http://localhost:3333
```

## Build

```bash
pnpm build:web
pnpm build:studio
```

## Routes

| Route | Purpose |
| :-- | :-- |
| `/` | Home — V1 *Editorial / High Couture* |
| `/two` | Home — V2 *Yin Yang* |
| `/three` | Home — V3 *Marketplace-forward* |
| `/marketplace` | Mock UI of the in-app marketplace |
| `/vision` | The pitch story (problem, insight, product, who it's for) |
| `/products` | Free / Vault / Vault+ / Skins |
| `/learn` | Memories, Wallets, Walls — concept primer |
| `/trust` | The Data Trust — six promises, public charter |
| `/registry` | The MemoryBinder Registry |
| `/waitlist` | Join the iOS waitlist |
| `/blog` | Blog (Sanity) |
| `/announcements` | News (Sanity) |
| `/legal/privacy` · `/legal/terms` | Legals |
| `/contact` | Contact us (linked from the footer) |

## Brand notes

- **Walls are painted white.** The body background is `#FFFFFF`. Color is applied to objects on the walls — never to the walls themselves.
- **Couture, but playful.** Editorial serif (Fraunces) + grotesk (Space Grotesk) + monospace (JetBrains Mono).
- **Dual color.** Pink `#E91E63` and teal `#1F7A7E` carry the MemoryBinder mark. Purple `#6B4FEC` is the accent.
- **The mark.** Two interlocking loops — one teal, one pink — bound at the centre. A binder. A yin yang.

## License

© MemoryBinder Pty Ltd. All rights reserved.
