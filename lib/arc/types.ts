export type RewardAssetKind = "usdc" | "token" | "nft";

export type TokenRewardInput = {
  kind: "usdc" | "token";
  amount: string;
  recipientAddress: `0x${string}`;
  token: "USDC" | `0x${string}`;
};

export type NftRewardInput = {
  kind: "nft";
  recipientAddress: `0x${string}`;
  contractAddress: `0x${string}`;
  tokenId: string;
};

export type RewardInput = TokenRewardInput | NftRewardInput;

export type ArcTransactionResult = {
  txHash: string;
  explorerUrl?: string;
  chain: "Arc_Testnet";
};

export type ArcWalletStatus =
  | "idle"
  | "missing_provider"
  | "connecting"
  | "connected"
  | "wrong_network"
  | "error";

export type ConnectedArcWallet = {
  address: `0x${string}`;
  chainId: number;
};
