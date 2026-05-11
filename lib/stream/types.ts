export type StreamCategory = "gaming" | "music" | "coding" | "sports";

export type StreamSummary = {
  slug: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  category: StreamCategory;
  viewerCount: number;
  isLive: boolean;
  accent: "cyan" | "rose" | "lime" | "amber";
  streamerAddress: `0x${string}`;
};
