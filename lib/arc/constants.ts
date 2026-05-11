import { publicEnv } from "@/lib/env";

export const ARC_TESTNET = {
  name: "Arc Testnet",
  chainId: publicEnv.NEXT_PUBLIC_ARC_CHAIN_ID,
  chainIdentifier: "Arc_Testnet",
  rpcUrl: publicEnv.NEXT_PUBLIC_ARC_RPC_URL,
  wsUrl: publicEnv.NEXT_PUBLIC_ARC_WS_URL,
  explorerUrl: publicEnv.NEXT_PUBLIC_ARC_EXPLORER_URL,
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  contracts: {
    usdc: publicEnv.NEXT_PUBLIC_ARC_USDC_ADDRESS,
  },
} as const;

export const ARC_DOCS_NOTES = {
  nftTransfer:
    "NFT transfers are not confirmed as an App Kit capability in Arc docs. Use standard EVM calls behind lib/arc only.",
  embeddedWallet:
    "Embedded wallet creation is not confirmed in Arc docs. Keep onboarding provider-agnostic until a wallet provider is selected.",
} as const;
