import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { LiveChatPanel } from "@/components/dashboard/live-chat-panel";
import { LiveStreamGrid } from "@/components/dashboard/live-stream-grid";
import { LivestreamPlayer } from "@/components/dashboard/livestream-player";
import { StreamDetails } from "@/components/dashboard/stream-details";
import { StreamerProfile } from "@/components/dashboard/streamer-profile";
import { TippingCard } from "@/components/dashboard/tipping-card";
import { TopNavbar } from "@/components/dashboard/top-navbar";

export function ArcStreamDashboard() {
  return (
    <div className="min-h-screen bg-transparent text-slate-950">
      <div className="flex">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <TopNavbar />
          <main className="mx-auto grid max-w-[1536px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
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
