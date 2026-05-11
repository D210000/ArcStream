# ArcStream

ArcStream is a Next.js App Router MVP for livestreaming with Arc-powered rewards.

## Architecture

- `lib/arc` contains all Arc and App Kit integration.
- `lib/stream` contains LiveKit-facing helpers and stream metadata.
- `lib/donations` contains donation types, validation, and feed fixtures.
- `components` contains responsive UI for landing, livestream room, wallet onboarding, donation modal, and realtime reward feed.
- `store` contains lightweight Zustand client state.

## Environment

Copy `.env.example` to `.env.local` and fill the LiveKit values when testing real room tokens.

Arc Testnet defaults are included:

- Chain ID: `5042002`
- RPC: `https://rpc.testnet.arc.network`
- WebSocket: `wss://rpc.testnet.arc.network`
- Explorer: `https://testnet.arcscan.app`

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
```

## Arc Notes

Token rewards use App Kit `send` on `Arc_Testnet`. NFT transfers are isolated behind a standard EVM ERC-721 service because NFT transfer support is not confirmed in Arc App Kit docs. Embedded wallet creation is represented as provider-neutral onboarding until a documented provider is selected.
