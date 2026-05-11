import Image from "next/image";

import { Button } from "@/components/ui/button";
import { mainStreamer, quickTips } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function TippingCard() {
  return (
    <section className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-lg font-black text-slate-950">Send a Tip</h2>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          on ARC Testnet
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-black text-slate-950">10.00</span>
          <span className="flex items-center gap-2 font-black text-slate-900">
            <span className="grid size-6 place-items-center rounded-full bg-blue-500 text-xs text-white">
              $
            </span>
            USDC
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {quickTips.map((tip) => (
          <button
            className={cn(
              "h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700",
              tip === "$10" &&
                "border-violet-400 bg-violet-50 text-violet-700 shadow-sm",
            )}
            key={tip}
            type="button"
          >
            {tip}
          </button>
        ))}
      </div>

      <Button className="mt-5 h-14 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-base shadow-xl shadow-violet-500/20 hover:from-fuchsia-400 hover:to-violet-500">
        Send Tip
      </Button>

      <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
        <span>You are sending to</span>
        <Image
          alt={mainStreamer.name}
          className="size-8 rounded-full object-cover"
          height={32}
          src={mainStreamer.avatar}
          width={32}
        />
        <span className="font-black text-slate-950">{mainStreamer.handle}</span>
      </div>
    </section>
  );
}
