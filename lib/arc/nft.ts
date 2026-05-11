"use client";

import { createWalletClient, custom, getContract } from "viem";

import { getInjectedWalletProvider } from "@/lib/arc/browser-wallet";
import { ARC_DOCS_NOTES, ARC_TESTNET } from "@/lib/arc/constants";
import type { ArcTransactionResult, NftRewardInput } from "@/lib/arc/types";

const erc721Abi = [
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

export async function sendNftReward(
  input: NftRewardInput,
  senderAddress: `0x${string}`,
): Promise<ArcTransactionResult> {
  const provider = getInjectedWalletProvider();

  if (!provider) {
    throw new Error("Connect a wallet before sending an NFT.");
  }

  // TODO: Not confirmed in Arc docs as an App Kit capability. This uses standard
  // EVM ERC-721 transfer behavior because Arc is documented as EVM compatible.
  console.info(ARC_DOCS_NOTES.nftTransfer);

  const client = createWalletClient({
    account: senderAddress,
    transport: custom(provider),
  });
  const contract = getContract({
    address: input.contractAddress,
    abi: erc721Abi,
    client,
  });

  const txHash = await contract.write.safeTransferFrom([
    senderAddress,
    input.recipientAddress,
    BigInt(input.tokenId),
  ], { account: senderAddress, chain: null });

  return {
    txHash,
    explorerUrl: `${ARC_TESTNET.explorerUrl}/tx/${txHash}`,
    chain: "Arc_Testnet",
  };
}
