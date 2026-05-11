"use client";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { Bell, Globe2, Menu, Search, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { BrandMark } from "@/components/dashboard/brand-mark";
import { Button } from "@/components/ui/button";
import { formatCompactAddress } from "@/lib/utils";
import { useDashboardUiStore } from "@/store/dashboard-ui-store";

export function TopNavbar() {
  const [query, setQuery] = useState("");
  const [locale, setLocale] = useState<"global" | "us">("global");
  const { address, isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const setSidebarOpen = useDashboardUiStore((state) => state.setSidebarOpen);
  const notificationOpen = useDashboardUiStore((state) => state.notificationOpen);
  const unreadNotifications = useDashboardUiStore(
    (state) => state.unreadNotifications,
  );
  const toggleNotifications = useDashboardUiStore(
    (state) => state.toggleNotifications,
  );
  const markNotificationsRead = useDashboardUiStore(
    (state) => state.markNotificationsRead,
  );

  const searchResults = useMemo(
    () =>
      ["Alexandra", "CryptoMax", "Sasha", "ChainBuilder", "Luna"].filter(
        (item) => item.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 xl:border-b-0">
      <div className="mx-auto flex max-w-[1536px] items-center gap-4">
        <div className="xl:hidden">
          <BrandMark />
        </div>
        <button
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 xl:hidden"
          onClick={() => setSidebarOpen(true)}
          type="button"
        >
          <Menu className="size-5" />
        </button>

        <label className="relative hidden w-full max-w-[520px] md:block xl:ml-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 pl-12 pr-4 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search streamers, topics, or collections"
            value={query}
          />
          {query ? (
            <div className="absolute left-0 top-14 z-50 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200">
              {searchResults.length ? (
                searchResults.map((result) => (
                  <button
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                    key={result}
                    onClick={() => setQuery(result)}
                    type="button"
                  >
                    {result}
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">
                  No matching streams.
                </p>
              )}
            </div>
          ) : null}
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button
            aria-label="Toggle locale"
            className="hidden size-11 place-items-center rounded-2xl text-slate-800 transition hover:bg-slate-100 active:scale-95 sm:grid"
            onClick={() =>
              setLocale((current) => (current === "global" ? "us" : "global"))
            }
            title={locale === "global" ? "Global" : "United States"}
            type="button"
          >
            <Globe2 className="size-5" />
          </button>
          <button
            aria-label="Notifications"
            className="relative hidden size-11 place-items-center rounded-2xl text-slate-800 transition hover:bg-slate-100 active:scale-95 sm:grid"
            onClick={() => {
              toggleNotifications();
              markNotificationsRead();
            }}
            type="button"
          >
            <Bell className="size-5" />
            {unreadNotifications ? (
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-violet-600" />
            ) : null}
          </button>
          {notificationOpen ? (
            <div className="absolute right-28 top-16 z-50 hidden w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200 sm:block">
              <p className="px-2 pb-2 text-sm font-black text-slate-950">
                Notifications
              </p>
              {["Alexandra crossed 50% of goal", "New tip from DeFiDegen"].map(
                (item) => (
                  <div
                    className="rounded-xl px-3 py-2 text-sm text-slate-600"
                    key={item}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          ) : null}
          <Button
            className="h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-violet-600 active:scale-[0.98]"
            disabled={isConnecting}
            onClick={() => {
              if (isConnected) {
                openAccountModal?.();
                return;
              }

              openConnectModal?.();
            }}
            type="button"
          >
            <WalletCards className="size-4" />
            {isConnected && address
              ? formatCompactAddress(address)
              : isConnecting
                ? "Connecting..."
                : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  );
}
