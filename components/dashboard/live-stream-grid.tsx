import Image from "next/image";
import { Eye } from "lucide-react";

import { liveStreams } from "@/lib/dashboard/mock-data";

export function LiveStreamGrid() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-950">Live Now</h2>
        <button
          className="text-sm font-bold text-violet-700 transition hover:text-violet-500"
          type="button"
        >
          View all
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {liveStreams.map((stream) => (
          <article className="group" key={stream.id}>
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
              <div className={`absolute inset-0 bg-gradient-to-br ${stream.accent}`} />
              <Image
                alt={stream.name}
                className="relative aspect-[1.55] w-full object-cover transition duration-500 group-hover:scale-105"
                height={150}
                src={stream.image}
                width={240}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
              <div className="absolute left-2.5 top-2.5 rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-black text-white">
                LIVE
              </div>
              <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg bg-black/35 px-2 py-1 text-xs font-bold text-white backdrop-blur">
                <Eye className="size-3.5" />
                {stream.viewers}
              </div>
              <span className="absolute bottom-2.5 left-2.5 size-2 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div className="mt-3 px-1">
              <h3 className="font-black text-slate-950">{stream.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{stream.title}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
