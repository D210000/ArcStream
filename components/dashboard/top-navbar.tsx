"use client";

import { Bell, Globe2, Menu, Search, WalletCards } from "lucide-react";

import { BrandMark } from "@/components/dashboard/brand-mark";
import { Button } from "@/components/ui/button";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 xl:border-b-0">
      <div className="mx-auto flex max-w-[1536px] items-center gap-4">
        <div className="xl:hidden">
          <BrandMark />
        </div>
        <button
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 xl:hidden"
          type="button"
        >
          <Menu className="size-5" />
        </button>

        <label className="relative hidden w-full max-w-[520px] md:block xl:ml-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 pl-12 pr-4 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            placeholder="Search streamers, topics, or collections"
          />
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button
            aria-label="Language"
            className="hidden size-11 place-items-center rounded-2xl text-slate-800 transition hover:bg-slate-100 sm:grid"
            type="button"
          >
            <Globe2 className="size-5" />
          </button>
          <button
            aria-label="Notifications"
            className="relative hidden size-11 place-items-center rounded-2xl text-slate-800 transition hover:bg-slate-100 sm:grid"
            type="button"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-violet-600" />
          </button>
          <Button className="h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-violet-600">
            <WalletCards className="size-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
