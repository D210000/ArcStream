"use client";

import { ExternalLink, Gift } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDonationFeedStore } from "@/store/donation-feed-store";

export function DonationFeed() {
  const items = useDonationFeedStore((state) => state.items);

  return (
    <section className="flex min-h-[360px] flex-col rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h2 className="font-semibold">Reward feed</h2>
          <p className="text-sm text-muted-foreground">Realtime viewer support</p>
        </div>
        <Gift className="size-5 text-primary" />
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {items.map((item) => (
          <article
            className="rounded-md border border-border bg-background p-3"
            key={item.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{item.donorName}</p>
                <p className="text-xs text-muted-foreground">{item.message}</p>
              </div>
              <Badge
                tone={
                  item.status === "confirmed"
                    ? "success"
                    : item.status === "failed"
                      ? "warning"
                      : "muted"
                }
              >
                {item.status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-primary">{item.amountLabel}</span>
              <span className="text-muted-foreground">{item.assetLabel}</span>
            </div>
            {item.explorerUrl ? (
              <Button asChild className="mt-3 w-full" size="sm" variant="ghost">
                <a href={item.explorerUrl} rel="noreferrer" target="_blank">
                  View receipt
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
