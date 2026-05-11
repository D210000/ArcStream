import { NextResponse } from "next/server";
import { z } from "zod";

import { createViewerToken } from "@/lib/stream/livekit";

const tokenRequestSchema = z.object({
  roomName: z.string().min(1),
  viewerName: z.string().min(1).max(64),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = tokenRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }

  try {
    const token = await createViewerToken(
      parsed.data.roomName,
      parsed.data.viewerName,
    );

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create LiveKit token.",
      },
      { status: 500 },
    );
  }
}
