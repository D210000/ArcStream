# PROJECT: ArcStream

ArcStream is a livestreaming platform powered by Arc by Circle.

The platform allows:
- streamers to go live
- viewers to watch streams
- viewers to send onchain rewards to streamers
- rewards may include stablecoins, tokens, NFTs, and future tokenized real-world assets (RWAs)

IMPORTANT:
This project is NOT a generic crypto app.
The UX should feel like Twitch or Kick, while blockchain complexity remains abstracted away.

---

# SOURCE OF TRUTH

Use ONLY these docs for Arc-related implementation details:

- https://docs.arc.network/llms.txt
- https://docs.arc.network/ai/mcp
- https://docs.arc.network/

Do NOT hallucinate APIs, SDK methods, or unsupported functionality.

If documentation is unclear:
- explicitly say "not confirmed in Arc docs"
- implement the safest modular fallback
- leave TODO comments instead of inventing behavior

---

# MVP GOALS

Build an MVP with:

1. Landing page
2. Streamer dashboard
3. Livestream room page
4. Viewer donation flow
5. Realtime donation feed
6. Arc integration layer
7. Embedded wallet onboarding
8. Mobile-friendly responsive UI

The MVP initially supports:
- USDC tipping
- token tipping
- NFT transfers

The architecture must later support:
- tokenized RWAs
- tokenized stocks
- collectibles
- automated asset routing

---

# TECH STACK

Use:

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- LiveKit for livestreaming
- Zustand for lightweight state
- Prisma if database needed
- PostgreSQL
- Vercel deployment target

Prefer:
- server actions
- modular architecture
- strict TypeScript
- reusable hooks
- clean folder structure

---

# DESIGN RULES

UI style:
- modern
- dark mode first
- creator economy aesthetic
- clean gradients
- minimal web3 jargon

DO NOT:
- overload UI with blockchain terminology
- expose chain IDs or bridge complexity to users
- require users to understand wallets

The app should feel:
- simple
- fast
- consumer-grade

---

# ARCHITECTURE RULES

Keep Arc integration isolated inside:

/lib/arc

Keep streaming isolated inside:

/lib/stream

Keep donation logic isolated inside:

/lib/donations

All blockchain interactions must be abstracted behind service functions.

Never spread Arc SDK calls randomly across components.

---

# CODING RULES

- Use production-quality code
- Avoid placeholder implementations unless necessary
- Add TODO comments for incomplete SDK areas
- Use async/await
- Use typed responses
- Avoid massive files
- Prefer composition over monoliths

---

# OUTPUT FORMAT

When implementing:
1. explain architecture briefly
2. list files being created
3. generate production-ready code
4. explain env variables
5. explain setup commands
6. explain next steps

Never skip file paths.

Always generate complete files unless explicitly asked for partial diffs.

---

# PRODUCT VISION

ArcStream is building:

"Twitch + programmable onchain rewards + real-world asset routing."

A fan should eventually be able to:
- tip stablecoins
- send collectibles
- send tokenized assets
- reward streamers instantly onchain

Arc handles routing and settlement abstraction where supported.

The long-term vision is:
"asset-native internet interactions."

Keep all implementations aligned with this vision.

accomplish this and test until done