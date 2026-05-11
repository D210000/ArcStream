import { demoStreamerAddress } from "@/lib/donations/fixtures";
import type { StreamSummary } from "@/lib/stream/types";

export const featuredStreams: StreamSummary[] = [
  {
    slug: "neon-finals",
    title: "Neon Finals: ranked climb with viewer rewards",
    creatorName: "Ari Vale",
    creatorHandle: "arivale",
    category: "gaming",
    viewerCount: 18420,
    isLive: true,
    accent: "cyan",
    streamerAddress: demoStreamerAddress,
  },
  {
    slug: "midnight-synth",
    title: "Midnight synth set and collectible drops",
    creatorName: "Lena Vox",
    creatorHandle: "lenavox",
    category: "music",
    viewerCount: 7908,
    isLive: true,
    accent: "rose",
    streamerAddress: "0x2222222222222222222222222222222222222222",
  },
  {
    slug: "ship-fast",
    title: "Building a creator dashboard live",
    creatorName: "Devon Ray",
    creatorHandle: "devonray",
    category: "coding",
    viewerCount: 4216,
    isLive: true,
    accent: "lime",
    streamerAddress: "0x3333333333333333333333333333333333333333",
  },
];

export function getStreamBySlug(slug: string) {
  return featuredStreams.find((stream) => stream.slug === slug);
}
