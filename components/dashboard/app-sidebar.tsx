"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Maximize2, Moon, Send, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

import { BrandMark } from "@/components/dashboard/brand-mark";
import { Button } from "@/components/ui/button";
import { quickTips, sidebarItems } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";
import { useDashboardUiStore } from "@/store/dashboard-ui-store";

export function AppSidebar() {
  const sidebarOpen = useDashboardUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useDashboardUiStore((state) => state.setSidebarOpen);

  return (
    <>
      <aside className="hidden min-h-screen w-[270px] shrink-0 border-r border-slate-200/80 bg-white/70 px-5 py-6 backdrop-blur-xl xl:flex xl:flex-col">
        <SidebarContent />
      </aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            type="button"
          />
          <aside className="relative flex h-full w-[300px] flex-col bg-white px-5 py-6 shadow-2xl">
            <button
              aria-label="Close menu"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-2xl text-slate-700 transition hover:bg-slate-100"
              onClick={() => setSidebarOpen(false)}
              type="button"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      ) : null}
    </>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [copied, setCopied] = useState(false);
  const selectedTip = useDashboardUiStore((state) => state.selectedTip);
  const setSelectedTip = useDashboardUiStore((state) => state.setSelectedTip);
  const displayMode = useDashboardUiStore((state) => state.displayMode);
  const setDisplayMode = useDashboardUiStore((state) => state.setDisplayMode);

  async function copyReceiveAddress() {
    if (!address) {
      openConnectModal?.();
      return;
    }

    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function focusTipCard() {
    document.getElementById("tip-card")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <>
      <BrandMark />

      <nav className="mt-10 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            className={cn(
              "flex h-12 w-full items-center gap-4 rounded-2xl px-5 text-[15px] font-semibold text-slate-900 transition hover:bg-violet-50 hover:text-violet-700",
              pathname === item.href &&
                "bg-gradient-to-r from-violet-100 to-fuchsia-50 text-violet-700 shadow-sm",
            )}
            href={item.href}
            key={item.label}
            onClick={onNavigate}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
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
            <Button className="h-11 rounded-xl active:scale-[0.98]" onClick={focusTipCard} type="button">
              <Send className="size-4" />
              Send
            </Button>
            <Button
              className="h-11 rounded-xl active:scale-[0.98]"
              onClick={copyReceiveAddress}
              type="button"
              variant="secondary"
            >
              {isConnected ? (copied ? "Copied" : "Receive") : "Connect"}
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
                selectedTip === tip && "ring-2 ring-violet-500 ring-offset-2",
              )}
              key={tip}
              onClick={() => {
                setSelectedTip(tip);
                focusTipCard();
              }}
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
        {[
          { mode: "light" as const, icon: Sun, label: "Light density" },
          { mode: "focus" as const, icon: Moon, label: "Focus density" },
          { mode: "fullscreen" as const, icon: Maximize2, label: "Wide density" },
        ].map((item) => (
          <button
            aria-label={item.label}
            className={cn(
              "grid h-12 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 active:scale-95",
              displayMode === item.mode && "bg-violet-100 text-violet-700",
            )}
            key={item.mode}
            onClick={() => setDisplayMode(item.mode)}
            type="button"
          >
            <item.icon className="size-5" />
          </button>
        ))}
      </div>
    </>
  );
}
