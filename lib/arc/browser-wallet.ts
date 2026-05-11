"use client";

import type { EIP1193Provider } from "viem";

import { ARC_TESTNET } from "@/lib/arc/constants";
import type { ConnectedArcWallet } from "@/lib/arc/types";

declare global {
  interface Window {
    ethereum?: EIP1193Provider;
  }
}

export function getInjectedWalletProvider() {
  return typeof window === "undefined" ? undefined : window.ethereum;
}

export async function connectInjectedWallet(): Promise<ConnectedArcWallet> {
  const provider = getInjectedWalletProvider();

  if (!provider) {
    throw new Error("No injected wallet provider found.");
  }

  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as `0x${string}`[];
  const chainIdHex = (await provider.request({
    method: "eth_chainId",
  })) as string;

  return {
    address: accounts[0],
    chainId: Number.parseInt(chainIdHex, 16),
  };
}

export async function switchToArcTestnet() {
  const provider = getInjectedWalletProvider();

  if (!provider) {
    throw new Error("No injected wallet provider found.");
  }

  const chainId = `0x${ARC_TESTNET.chainId.toString(16)}`;

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    const typedError = error as { code?: number };

    if (typedError.code !== 4902) {
      throw error;
    }

    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId,
          chainName: ARC_TESTNET.name,
          nativeCurrency: ARC_TESTNET.nativeCurrency,
          rpcUrls: [ARC_TESTNET.rpcUrl],
          blockExplorerUrls: [ARC_TESTNET.explorerUrl],
        },
      ],
    });
  }
}
