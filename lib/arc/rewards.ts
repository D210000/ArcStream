"use client";

import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";

import { getInjectedWalletProvider } from "@/lib/arc/browser-wallet";
import { ARC_TESTNET } from "@/lib/arc/constants";
import type { ArcTransactionResult, TokenRewardInput } from "@/lib/arc/types";

export async function sendTokenReward(
  input: TokenRewardInput,
): Promise<ArcTransactionResult> {
  const provider = getInjectedWalletProvider();

  if (!provider) {
    throw new Error("Connect a wallet before sending a reward.");
  }

  const adapter = await createViemAdapterFromProvider({ provider });
  const kit = new AppKit();

  const result = await kit.send({
    from: { adapter, chain: ARC_TESTNET.chainIdentifier },
    to: input.recipientAddress,
    amount: input.amount,
    token: input.token,
  });

  const txHash = String(result.txHash);

  return {
    txHash,
    explorerUrl: result.explorerUrl ?? `${ARC_TESTNET.explorerUrl}/tx/${txHash}`,
    chain: "Arc_Testnet",
  };
}

export async function estimateTokenReward(input: TokenRewardInput) {
  const provider = getInjectedWalletProvider();

  if (!provider) {
    throw new Error("Connect a wallet before estimating a reward.");
  }

  const adapter = await createViemAdapterFromProvider({ provider });
  const kit = new AppKit();

  return kit.estimateSend({
    from: { adapter, chain: ARC_TESTNET.chainIdentifier },
    to: input.recipientAddress,
    amount: input.amount,
    token: input.token,
  });
}
