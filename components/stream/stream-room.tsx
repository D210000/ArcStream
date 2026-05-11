"use client";

import { MessageSquare, Share2, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DonationFeed } from "@/components/donations/donation-feed";
import { DonationModal } from "@/components/donations/donation-modal";
import { LiveVideoPanel } from "@/components/stream/live-video-panel";
import { WalletOnboarding } from "@/components/wallet/wallet-onboarding";
import type { StreamSummary } from "@/lib/stream/types";

export function StreamRoom({ stream }: { stream: StreamSummary }) {
  const [following, setFollowing] = useState(false);
  const [shared, setShared] = useState(false);

  async function shareStream() {
    const shareUrl = `${window.location.origin}/streams/${stream.slug}`;

    if (navigator.share) {
      await navigator.share({
        title: stream.title,
        text: `Watch ${stream.creatorName} live on ArcStream`,
        url: shareUrl,
      });
      setShared(true);
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setShared(true);
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <div className="space-y-5">
        <LiveVideoPanel stream={stream} />

        <section className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">@{stream.creatorHandle}</p>
            <h2 className="text-xl font-bold">{stream.creatorName}</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Rewards settle on Arc while the room keeps the familiar livestream
              feel: creator first, wallet details tucked away.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DonationModal
              creatorName={stream.creatorName}
              streamerAddress={stream.streamerAddress}
            />
            <Button
              aria-label={following ? "Unfollow stream" : "Follow stream"}
              onClick={() => setFollowing((current) => !current)}
              size="icon"
              title={following ? "Following" : "Follow"}
              type="button"
              variant="secondary"
            >
              <Star className={following ? "size-4 fill-current" : "size-4"} />
            </Button>
            <Button
              aria-label={shared ? "Stream link copied" : "Share stream"}
              onClick={shareStream}
              size="icon"
              title={shared ? "Copied" : "Share"}
              type="button"
              variant="secondary"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <MessageSquare className="size-5 text-primary" />
            <h2 className="font-semibold">Live chat</h2>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <p>
              <span className="font-semibold text-primary">Maya:</span> That
              last round was unreal.
            </p>
            <p>
              <span className="font-semibold text-rose-200">Northstar:</span>{" "}
              Reward feed is moving today.
            </p>
            <p>
              <span className="font-semibold text-lime-200">Juno:</span> One
              more and we get the drop.
            </p>
          </div>
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <WalletOnboarding />
        <DonationFeed />
      </aside>
    </main>
  );
}
