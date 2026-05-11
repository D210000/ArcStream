import { AccessToken } from "livekit-server-sdk";

import { getServerEnv } from "@/lib/env";

export async function createViewerToken(roomName: string, viewerName: string) {
  const env = getServerEnv();

  if (!env.LIVEKIT_API_KEY || !env.LIVEKIT_API_SECRET) {
    throw new Error("LiveKit credentials are not configured.");
  }

  const token = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: viewerName,
    name: viewerName,
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: false,
    canSubscribe: true,
  });

  return token.toJwt();
}
