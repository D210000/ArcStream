import { Radio, SignalHigh, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { StreamSummary } from "@/lib/stream/types";

export function LiveVideoPanel({ stream }: { stream: StreamSummary }) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-black">
      <div className="relative aspect-video min-h-[260px] bg-[radial-gradient(circle_at_30%_20%,rgba(27,217,183,.24),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(251,113,133,.18),transparent_28%),linear-gradient(135deg,#030712,#111827_45%,#020617)]">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge tone="live">LIVE</Badge>
          <Badge>
            <Users className="mr-1 size-3" />
            {stream.viewerCount.toLocaleString()}
          </Badge>
        </div>
        <div className="absolute inset-x-6 bottom-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-white/65">Now streaming</p>
              <h1 className="max-w-3xl text-2xl font-bold text-white sm:text-4xl">
                {stream.title}
              </h1>
            </div>
            <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur md:flex">
              <SignalHigh className="size-4 text-primary" />
              HD
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white">
          <Radio className="size-5" />
        </div>
      </div>
    </section>
  );
}
