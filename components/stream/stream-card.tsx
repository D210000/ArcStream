import Link from "next/link";
import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StreamSummary } from "@/lib/stream/types";

const accentClasses: Record<StreamSummary["accent"], string> = {
  cyan: "from-cyan-400/30 via-slate-950 to-emerald-300/20",
  rose: "from-rose-400/30 via-slate-950 to-amber-300/20",
  lime: "from-lime-300/30 via-slate-950 to-cyan-400/20",
  amber: "from-amber-300/30 via-slate-950 to-rose-300/20",
};

export function StreamCard({ stream }: { stream: StreamSummary }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface">
      <div
        className={`relative aspect-video bg-gradient-to-br ${accentClasses[stream.accent]}`}
      >
        <div className="absolute inset-4 rounded-md border border-white/10 bg-black/20" />
        <div className="absolute left-4 top-4">
          <Badge tone="live">LIVE</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{stream.creatorName}</p>
            <p className="text-xs text-white/70">@{stream.creatorHandle}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-xs text-white">
            <Users className="size-3.5" />
            {stream.viewerCount.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h3 className="line-clamp-2 font-semibold">{stream.title}</h3>
          <p className="mt-1 text-sm capitalize text-muted-foreground">
            {stream.category}
          </p>
        </div>
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/streams/${stream.slug}`}>Watch stream</Link>
        </Button>
      </div>
    </article>
  );
}
