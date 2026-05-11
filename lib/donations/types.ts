import type { RewardAssetKind } from "@/lib/arc/types";

export type DonationStatus = "pending" | "confirmed" | "failed";

export type DonationFeedItem = {
  id: string;
  donorName: string;
  donorAddress?: `0x${string}`;
  streamerAddress: `0x${string}`;
  assetKind: RewardAssetKind;
  assetLabel: string;
  amountLabel: string;
  message: string;
  status: DonationStatus;
  txHash?: string;
  explorerUrl?: string;
  createdAt: string;
};

export type DonationFormValues = {
  assetKind: RewardAssetKind;
  amount: string;
  tokenAddress: string;
  nftContractAddress: string;
  nftTokenId: string;
  message: string;
};
