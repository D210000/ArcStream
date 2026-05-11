import Link from "next/link";
import { ArrowRight, Coins, RadioTower, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StreamCard } from "@/components/stream/stream-card";
import { featuredStreams } from "@/lib/stream/fixtures";

export function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(27,217,183,.18),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(251,113,133,.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,.4),transparent)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted-foreground">
              <RadioTower className="size-4 text-primary" />
              Live rewards on Arc Testnet
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
              ArcStream
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A creator-first livestreaming MVP where fans tip USDC, tokens, and
              collectibles while the onchain parts stay out of the way.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/streams/neon-finals">
                  Watch live
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Streamer dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4 shadow-2xl">
            <div className="aspect-[4/5] rounded-md bg-[radial-gradient(circle_at_35%_20%,rgba(27,217,183,.28),transparent_30%),radial-gradient(circle_at_70%_65%,rgba(250,204,21,.15),transparent_28%),linear-gradient(145deg,#020617,#111827_55%,#031812)] p-4">
              <div className="flex h-full flex-col justify-between rounded-md border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    LIVE
                  </span>
                  <span className="text-sm text-white/70">18.4K watching</span>
                </div>
                <div>
                  <p className="text-sm text-white/65">Reward just landed</p>
                  <p className="mt-2 text-4xl font-black text-white">25 USDC</p>
                  <p className="mt-2 text-sm text-white/70">
                    “That clutch was clean.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Live now</h2>
            <p className="text-muted-foreground">Watch, chat, and reward creators.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredStreams.map((stream) => (
            <StreamCard key={stream.slug} stream={stream} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/35">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <Feature
            icon={<Coins className="size-5" />}
            title="Consumer tipping"
            text="USDC and token rewards are presented as simple creator support."
          />
          <Feature
            icon={<ShieldCheck className="size-5" />}
            title="Arc isolated"
            text="All chain behavior lives behind service functions in lib/arc."
          />
          <Feature
            icon={<RadioTower className="size-5" />}
            title="Livestream native"
            text="The interface feels like a live room first, not a chain dashboard."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="mb-3 grid size-10 place-items-center rounded-md bg-primary/15 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
