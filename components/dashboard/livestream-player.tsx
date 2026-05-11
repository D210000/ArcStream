import Image from "next/image";
import {
  Expand,
  Eye,
  Mic,
  Monitor,
  PhoneOff,
  Settings,
  Video,
} from "lucide-react";

import { mainStreamer } from "@/lib/dashboard/mock-data";

export function LivestreamPlayer() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl shadow-slate-900/10">
      <div className="relative aspect-[16/8.15] min-h-[360px]">
        <Image
          alt="Alexandra livestreaming"
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1280px) 880px, 100vw"
          src={mainStreamer.hero}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
        <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
          <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-black text-white shadow-lg shadow-rose-600/20">
            <span className="size-2 rounded-full bg-white" />
            LIVE
          </span>
          <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-black/45 px-4 text-sm font-bold text-white backdrop-blur">
            <Eye className="size-4" />
            {mainStreamer.viewers}
          </span>
        </div>
        <div className="absolute right-4 top-4 hidden gap-3 sm:right-5 sm:top-5 md:flex">
          {[Settings, Monitor, Expand].map((Icon, index) => (
            <button
              aria-label={`Player action ${index + 1}`}
              className="grid size-11 place-items-center rounded-xl bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60"
              key={index}
              type="button"
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 text-sm font-bold text-white backdrop-blur">
          <span className="size-2.5 rounded-full bg-emerald-400" />
          Excellent Connection
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-3 sm:bottom-5 sm:right-5">
          {[Mic, Video, Monitor].map((Icon, index) => (
            <button
              aria-label={`Call control ${index + 1}`}
              className="grid size-12 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60"
              key={index}
              type="button"
            >
              <Icon className="size-5" />
            </button>
          ))}
          <button
            aria-label="End call"
            className="grid size-12 place-items-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition hover:scale-105 hover:bg-rose-600"
            type="button"
          >
            <PhoneOff className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
