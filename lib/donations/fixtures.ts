import type { DonationFeedItem } from "@/lib/donations/types";

export const demoStreamerAddress =
  "0x1111111111111111111111111111111111111111" as const;

export const initialDonationFeed: DonationFeedItem[] = [
  {
    id: "demo-1",
    donorName: "Maya",
    donorAddress: "0x8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a",
    streamerAddress: demoStreamerAddress,
    assetKind: "usdc",
    assetLabel: "USDC",
    amountLabel: "25 USDC",
    message: "That clutch was clean.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: "demo-2",
    donorName: "Northstar",
    streamerAddress: demoStreamerAddress,
    assetKind: "token",
    assetLabel: "Creator token",
    amountLabel: "120 TOK",
    message: "Run it back.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
  },
  {
    id: "demo-3",
    donorName: "Juno",
    streamerAddress: demoStreamerAddress,
    assetKind: "nft",
    assetLabel: "Collectible",
    amountLabel: "#184",
    message: "Vaulting this moment.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
];
