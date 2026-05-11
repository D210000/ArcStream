"use client";

import { Maximize2, Moon, Send, Sun } from "lucide-react";

import { BrandMark } from "@/components/dashboard/brand-mark";
import { Button } from "@/components/ui/button";
import { quickTips, sidebarItems } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-[270px] shrink-0 border-r border-slate-200/80 bg-white/70 px-5 py-6 backdrop-blur-xl xl:flex xl:flex-col">
      <BrandMark />

      <nav className="mt-10 space-y-2">
        {sidebarItems.map((item) => (
          <button
            className={cn(
              "flex h-12 w-full items-center gap-4 rounded-2xl px-5 text-[15px] font-semibold text-slate-900 transition hover:bg-violet-50 hover:text-violet-700",
              item.active &&
                "bg-gradient-to-r from-violet-100 to-fuchsia-50 text-violet-700 shadow-sm",
            )}
            key={item.label}
            type="button"
          >
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        <p className="px-1 text-xs font-bold uppercase tracking-normal text-slate-400">
          Wallet
        </p>
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Balance</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-black text-slate-950">$1,248.75</p>
            <span className="grid size-5 place-items-center rounded-full bg-blue-500 text-[10px] font-black text-white">
              $
            </span>
            <span className="font-semibold text-slate-700">USDC</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button className="h-11 rounded-xl" type="button">
              <Send className="size-4" />
              Send
            </Button>
            <Button className="h-11 rounded-xl" type="button" variant="secondary">
              Receive
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <p className="px-1 text-xs font-bold uppercase tracking-normal text-slate-400">
          Quick Tip
        </p>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {quickTips.map((tip, index) => (
            <button
              className={cn(
                "h-10 rounded-full text-sm font-bold transition hover:-translate-y-0.5",
                index === 0 && "bg-violet-100 text-violet-700",
                index === 1 && "bg-rose-100 text-rose-700",
                index === 2 && "bg-amber-100 text-amber-700",
                index === 3 && "bg-emerald-100 text-emerald-700",
              )}
              key={tip}
              type="button"
            >
              {tip}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-normal text-slate-400">
          On Arc Testnet
        </p>
        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Chain ID</span>
            <span className="font-bold text-slate-900">5042002</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Network</span>
            <span className="font-bold text-slate-900">Arc Testnet</span>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-sm">
        {[Sun, Moon, Maximize2].map((Icon, index) => (
          <button
            aria-label={`Display option ${index + 1}`}
            className="grid h-12 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100"
            key={index}
            type="button"
          >
            <Icon className="size-5" />
          </button>
        ))}
      </div>
    </aside>
  );
}
