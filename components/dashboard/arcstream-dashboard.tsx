"use client";

import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { LiveChatPanel } from "@/components/dashboard/live-chat-panel";
import { LiveStreamGrid } from "@/components/dashboard/live-stream-grid";
import { LivestreamPlayer } from "@/components/dashboard/livestream-player";
import { StreamDetails } from "@/components/dashboard/stream-details";
import { StreamerProfile } from "@/components/dashboard/streamer-profile";
import { TippingCard } from "@/components/dashboard/tipping-card";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { cn } from "@/lib/utils";
import { useDashboardUiStore } from "@/store/dashboard-ui-store";

export function ArcStreamDashboard() {
  const displayMode = useDashboardUiStore((state) => state.displayMode);

  return (
    <div className="min-h-screen bg-transparent text-slate-950">
      <div className="flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <TopNavbar />
          <main
            className={cn(
              "mx-auto grid max-w-[1536px] gap-5 px-4 py-5 transition-all sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8",
              displayMode === "focus" && "max-w-[1280px]",
              displayMode === "fullscreen" && "max-w-none",
            )}
          >
            <div className="space-y-5">
              <StreamerProfile />
              <LivestreamPlayer />
              <StreamDetails />
              <LiveStreamGrid />
              <AnalyticsWidgets />
            </div>
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <LiveChatPanel />
              <TippingCard />
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
