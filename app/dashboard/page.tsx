import { BarChart3, RadioTower, WalletCards } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredStreams } from "@/lib/stream/fixtures";

export default function DashboardPage() {
  const stream = featuredStreams[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge tone="live">Creator console</Badge>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Streamer dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your live room, track rewards, and keep wallet operations
            abstracted behind ArcStream services.
          </p>
        </div>
        <Button asChild>
          <Link href="/streams/neon-finals">Start stream</Link>
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <RadioTower className="size-5 text-primary" />
            <h2 className="font-semibold">Current room</h2>
          </div>
          <div className="mt-5 aspect-video rounded-md bg-[radial-gradient(circle_at_30%_25%,rgba(27,217,183,.2),transparent_30%),linear-gradient(135deg,#020617,#111827)]" />
          <div className="mt-5">
            <h3 className="text-xl font-bold">{stream.title}</h3>
            <p className="text-sm text-muted-foreground">
              {stream.viewerCount.toLocaleString()} viewers watching
            </p>
          </div>
        </section>

        <aside className="space-y-5">
          <Metric
            icon={<WalletCards className="size-5" />}
            label="Rewards today"
            value="1,284 USDC"
          />
          <Metric
            icon={<BarChart3 className="size-5" />}
            label="Average reward"
            value="18.20 USDC"
          />
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-semibold">Asset routes</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              USDC, token, and NFT flows are modular now so RWAs, tokenized
              stocks, and automated routing can be added without rewriting the
              room UI.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-4 grid size-10 place-items-center rounded-md bg-primary/15 text-primary">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </section>
  );
}
