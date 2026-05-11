import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import type { Chain } from "wagmi/chains";

import { ARC_TESTNET } from "@/lib/arc/constants";

export const arcTestnet = {
  id: ARC_TESTNET.chainId,
  name: ARC_TESTNET.name,
  nativeCurrency: ARC_TESTNET.nativeCurrency,
  rpcUrls: {
    default: {
      http: [ARC_TESTNET.rpcUrl],
      webSocket: [ARC_TESTNET.wsUrl],
    },
    public: {
      http: [ARC_TESTNET.rpcUrl],
      webSocket: [ARC_TESTNET.wsUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: ARC_TESTNET.explorerUrl,
    },
  },
  testnet: true,
} as const satisfies Chain;

export const wagmiConfig = getDefaultConfig({
  appName: "ArcStream",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    "arcstream-local-development",
  chains: [arcTestnet],
  ssr: true,
  transports: {
    [arcTestnet.id]: http(ARC_TESTNET.rpcUrl),
  },
});
