import { describe, expect, it } from "vitest";

import { donationFormSchema } from "@/lib/donations/validation";

describe("donationFormSchema", () => {
  it("accepts a USDC tip with 6 decimals", () => {
    const parsed = donationFormSchema.safeParse({
      assetKind: "usdc",
      amount: "12.345678",
      tokenAddress: "",
      nftContractAddress: "",
      nftTokenId: "",
      message: "great stream",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects an invalid custom token address", () => {
    const parsed = donationFormSchema.safeParse({
      assetKind: "token",
      amount: "4",
      tokenAddress: "not-an-address",
      nftContractAddress: "",
      nftTokenId: "",
      message: "",
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts an NFT transfer payload", () => {
    const parsed = donationFormSchema.safeParse({
      assetKind: "nft",
      amount: "",
      tokenAddress: "",
      nftContractAddress: "0x4444444444444444444444444444444444444444",
      nftTokenId: "184",
      message: "collectible incoming",
    });

    expect(parsed.success).toBe(true);
  });
});
