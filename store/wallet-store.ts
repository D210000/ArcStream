"use client";

import { create } from "zustand";

import {
  connectInjectedWallet,
  switchToArcTestnet,
} from "@/lib/arc/browser-wallet";
import { ARC_TESTNET } from "@/lib/arc/constants";
import type { ArcWalletStatus, ConnectedArcWallet } from "@/lib/arc/types";

type WalletState = {
  wallet?: ConnectedArcWallet;
  status: ArcWalletStatus;
  error?: string;
  connect: () => Promise<void>;
  switchNetwork: () => Promise<void>;
};

export const useWalletStore = create<WalletState>((set, get) => ({
  status: "idle",
  connect: async () => {
    set({ status: "connecting", error: undefined });

    try {
      const wallet = await connectInjectedWallet();
      set({
        wallet,
        status:
          wallet.chainId === ARC_TESTNET.chainId ? "connected" : "wrong_network",
      });
    } catch (error) {
      set({
        status:
          error instanceof Error &&
          error.message.includes("No injected wallet provider")
            ? "missing_provider"
            : "error",
        error: error instanceof Error ? error.message : "Unable to connect wallet.",
      });
    }
  },
  switchNetwork: async () => {
    try {
      await switchToArcTestnet();
      await get().connect();
    } catch (error) {
      set({
        status: "error",
        error:
          error instanceof Error ? error.message : "Unable to switch networks.",
      });
    }
  },
}));
