"use client";

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
import { useState } from "react";

import { mainStreamer } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function LivestreamPlayer() {
  const [muted, setMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenEnabled, setScreenEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quality, setQuality] = useState<"720p" | "1080p">("1080p");
  const [expanded, setExpanded] = useState(false);
  const [streamEnded, setStreamEnded] = useState(false);

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl shadow-slate-900/10 transition",
        expanded && "lg:col-span-2",
      )}
    >
      <div className="relative aspect-[16/8.15] min-h-[360px]">
        <Image
          alt="Alexandra livestreaming"
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1280px) 880px, 100vw"
          src={mainStreamer.hero}
        />
        {streamEnded ? (
          <div className="absolute inset-0 z-10 grid place-items-center bg-slate-950/80 text-center text-white backdrop-blur-sm">
            <div>
              <p className="text-3xl font-black">Stream paused</p>
              <button
                className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 active:scale-95"
                onClick={() => setStreamEnded(false)}
                type="button"
              >
                Resume preview
              </button>
            </div>
          </div>
        ) : null}
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
          {[
            {
              icon: Settings,
              label: "Open player settings",
              active: settingsOpen,
              onClick: () => setSettingsOpen((current) => !current),
            },
            {
              icon: Monitor,
              label: `Set quality to ${quality === "1080p" ? "720p" : "1080p"}`,
              active: quality === "1080p",
              onClick: () =>
                setQuality((current) => (current === "1080p" ? "720p" : "1080p")),
            },
            {
              icon: Expand,
              label: "Toggle wide player",
              active: expanded,
              onClick: () => setExpanded((current) => !current),
            },
          ].map((action) => (
            <button
              aria-label={action.label}
              className={cn(
                "grid size-11 place-items-center rounded-xl bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60 active:scale-95",
                action.active && "bg-violet-600/80",
              )}
              key={action.label}
              onClick={action.onClick}
              type="button"
            >
              <action.icon className="size-5" />
            </button>
          ))}
        </div>
        {settingsOpen ? (
          <div className="absolute right-4 top-20 rounded-2xl border border-white/10 bg-black/55 p-3 text-sm text-white shadow-2xl backdrop-blur">
            <p className="font-black">Player settings</p>
            <button
              className="mt-3 rounded-xl bg-white/10 px-3 py-2 font-bold transition hover:bg-white/20"
              onClick={() =>
                setQuality((current) => (current === "1080p" ? "720p" : "1080p"))
              }
              type="button"
            >
              Quality: {quality}
            </button>
          </div>
        ) : null}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/35 px-3 py-2 text-sm font-bold text-white backdrop-blur">
          <span className="size-2.5 rounded-full bg-emerald-400" />
          Excellent Connection
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-3 sm:bottom-5 sm:right-5">
          {[
            {
              icon: Mic,
              label: muted ? "Unmute microphone" : "Mute microphone",
              active: !muted,
              onClick: () => setMuted((current) => !current),
            },
            {
              icon: Video,
              label: cameraEnabled ? "Disable camera" : "Enable camera",
              active: cameraEnabled,
              onClick: () => setCameraEnabled((current) => !current),
            },
            {
              icon: Monitor,
              label: screenEnabled ? "Stop screen share" : "Start screen share",
              active: screenEnabled,
              onClick: () => setScreenEnabled((current) => !current),
            },
          ].map((control) => (
            <button
              aria-label={control.label}
              className={cn(
                "grid size-12 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60 active:scale-95",
                control.active && "bg-white/25",
                !control.active && "bg-rose-500/80",
              )}
              key={control.label}
              onClick={control.onClick}
              type="button"
            >
              <control.icon className="size-5" />
            </button>
          ))}
          <button
            aria-label="End call"
            className="grid size-12 place-items-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition hover:scale-105 hover:bg-rose-600"
            onClick={() => setStreamEnded(true)}
            type="button"
          >
            <PhoneOff className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
