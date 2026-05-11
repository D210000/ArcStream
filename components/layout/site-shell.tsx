import Link from "next/link";
import { RadioTower } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2 font-bold" href="/">
            <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <RadioTower className="size-5" />
            </span>
            <span>ArcStream</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost">
              <Link href="/streams/neon-finals">Watch</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
          <Button asChild size="sm" variant="secondary">
            <Link href="/streams/neon-finals">Go live</Link>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}
