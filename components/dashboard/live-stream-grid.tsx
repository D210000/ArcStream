"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { liveStreams } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

const filters = ["All", "Trading", "Development", "Contracts", "RWAs"] as const;
type StreamFilter = (typeof filters)[number];

export function LiveStreamGrid() {
  const [activeFilter, setActiveFilter] = useState<StreamFilter>("All");
  const [showAll, setShowAll] = useState(false);
  const filteredStreams = useMemo(
    () =>
      liveStreams.filter(
        (stream) => activeFilter === "All" || stream.category === activeFilter,
      ),
    [activeFilter],
  );
  const visibleStreams = showAll ? filteredStreams : filteredStreams.slice(0, 4);

  return (
    <section id="live-now">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-black text-slate-950">Live Now</h2>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              className={cn(
                "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 transition hover:border-violet-300 hover:text-violet-700 active:scale-95",
                activeFilter === filter &&
                  "border-violet-400 bg-violet-50 text-violet-700",
              )}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
          <button
            className="ml-1 text-sm font-bold text-violet-700 transition hover:text-violet-500"
            onClick={() => setShowAll((current) => !current)}
            type="button"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleStreams.map((stream) => (
          <Link className="group block" href={`/streams/${stream.routeSlug}`} key={stream.id}>
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
          </Link>
        ))}
      </div>
    </section>
  );
}
