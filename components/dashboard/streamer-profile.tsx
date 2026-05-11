import Image from "next/image";
import { BadgeCheck, Heart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mainStreamer, topCategories } from "@/lib/dashboard/mock-data";

export function StreamerProfile() {
  return (
    <section className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            alt={mainStreamer.name}
            className="size-16 rounded-full object-cover ring-4 ring-white"
            height={64}
            src={mainStreamer.avatar}
            width={64}
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-slate-950">
                {mainStreamer.name}
              </h1>
              <BadgeCheck className="size-5 fill-violet-600 text-white" />
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-600">
                LIVE
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {mainStreamer.subtitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCategories.map((category) => (
                <span
                  className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 shadow-lg shadow-violet-500/20">
            <Heart className="size-4" />
            Follow
          </Button>
          <Button className="h-12 rounded-2xl px-5" variant="secondary">
            <Users className="size-4" />
            {mainStreamer.viewers}
          </Button>
        </div>
      </div>
    </section>
  );
}
