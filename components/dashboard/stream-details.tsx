import { Trophy } from "lucide-react";

export function StreamDetails() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_240px_240px]">
      <div className="rounded-2xl bg-white p-4 sm:p-5">
        <h2 className="text-base font-black text-slate-950">About the stream</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-700">
          Building a decentralized streaming platform on ARC testnet. Today we
          are adding tipping with USDC and tokenized assets.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-black text-slate-950">Stream Goal</h2>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-950">$1,250</span>
          <span className="text-sm font-semibold text-slate-400">/ $2,500</span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        </div>
        <div className="mt-3 flex justify-between text-sm text-slate-500">
          <span>New PC Setup</span>
          <span>50%</span>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 p-4 text-white shadow-xl shadow-rose-500/20">
        <div className="flex items-center gap-2">
          <Trophy className="size-4" />
          <h2 className="font-black">Top Supporter</h2>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Trophy className="size-5" />
          </div>
          <div>
            <p className="font-bold">0xA7B...3F2c</p>
            <p className="mt-1 text-xl font-black">$250.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
