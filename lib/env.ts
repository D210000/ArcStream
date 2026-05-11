import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_LIVEKIT_URL: z.string().optional().default(""),
  NEXT_PUBLIC_ARC_CHAIN_ID: z.coerce.number().default(5042002),
  NEXT_PUBLIC_ARC_RPC_URL: z
    .string()
    .url()
    .default("https://rpc.testnet.arc.network"),
  NEXT_PUBLIC_ARC_WS_URL: z
    .string()
    .url()
    .default("wss://rpc.testnet.arc.network"),
  NEXT_PUBLIC_ARC_EXPLORER_URL: z
    .string()
    .url()
    .default("https://testnet.arcscan.app"),
  NEXT_PUBLIC_ARC_USDC_ADDRESS: z
    .string()
    .default("0x3600000000000000000000000000000000000000"),
  NEXT_PUBLIC_DEFAULT_STREAMER_ADDRESS: z.string().optional().default(""),
});

const serverEnvSchema = publicEnvSchema.extend({
  LIVEKIT_API_KEY: z.string().optional().default(""),
  LIVEKIT_API_SECRET: z.string().optional().default(""),
  CIRCLE_KIT_KEY: z.string().optional().default(""),
  CIRCLE_API_KEY: z.string().optional().default(""),
  CIRCLE_ENTITY_SECRET: z.string().optional().default(""),
});

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_LIVEKIT_URL: process.env.NEXT_PUBLIC_LIVEKIT_URL,
  NEXT_PUBLIC_ARC_CHAIN_ID: process.env.NEXT_PUBLIC_ARC_CHAIN_ID,
  NEXT_PUBLIC_ARC_RPC_URL: process.env.NEXT_PUBLIC_ARC_RPC_URL,
  NEXT_PUBLIC_ARC_WS_URL: process.env.NEXT_PUBLIC_ARC_WS_URL,
  NEXT_PUBLIC_ARC_EXPLORER_URL: process.env.NEXT_PUBLIC_ARC_EXPLORER_URL,
  NEXT_PUBLIC_ARC_USDC_ADDRESS: process.env.NEXT_PUBLIC_ARC_USDC_ADDRESS,
  NEXT_PUBLIC_DEFAULT_STREAMER_ADDRESS:
    process.env.NEXT_PUBLIC_DEFAULT_STREAMER_ADDRESS,
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
