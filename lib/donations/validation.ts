import { z } from "zod";

export const evmAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Enter a valid EVM address.");

export const donationFormSchema = z.discriminatedUnion("assetKind", [
  z.object({
    assetKind: z.literal("usdc"),
    amount: z
      .string()
      .regex(/^\d+(\.\d{1,6})?$/, "Use up to 6 decimal places.")
      .refine((value) => Number(value) > 0, "Amount must be greater than 0."),
    tokenAddress: z.string().optional(),
    nftContractAddress: z.string().optional(),
    nftTokenId: z.string().optional(),
    message: z.string().max(140).default(""),
  }),
  z.object({
    assetKind: z.literal("token"),
    amount: z
      .string()
      .regex(/^\d+(\.\d{1,18})?$/, "Use a valid token amount.")
      .refine((value) => Number(value) > 0, "Amount must be greater than 0."),
    tokenAddress: evmAddressSchema,
    nftContractAddress: z.string().optional(),
    nftTokenId: z.string().optional(),
    message: z.string().max(140).default(""),
  }),
  z.object({
    assetKind: z.literal("nft"),
    amount: z.string().optional(),
    tokenAddress: z.string().optional(),
    nftContractAddress: evmAddressSchema,
    nftTokenId: z.string().regex(/^\d+$/, "Token ID must be numeric."),
    message: z.string().max(140).default(""),
  }),
]);

export type ParsedDonationForm = z.infer<typeof donationFormSchema>;
