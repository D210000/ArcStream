import { Activity, BarChart3, TrendingUp } from "lucide-react";

import { analyticsWidgets } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

const icons = [TrendingUp, Activity, BarChart3];

export function AnalyticsWidgets() {
  return (
    <section className="grid gap-4 md:grid-cols-3" id="analytics">
      {analyticsWidgets.map((widget, index) => {
        const Icon = icons[index] ?? TrendingUp;

        return (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/70"
            key={widget.label}
          >
            <div
              className={cn(
                "mb-5 grid size-11 place-items-center rounded-2xl",
                widget.tone === "purple" && "bg-violet-100 text-violet-700",
                widget.tone === "green" && "bg-emerald-100 text-emerald-700",
                widget.tone === "blue" && "bg-sky-100 text-sky-700",
              )}
            >
              <Icon className="size-5" />
            </div>
            <p className="text-sm font-semibold text-slate-500">{widget.label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-2xl font-black text-slate-950">{widget.value}</p>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-600">
                {widget.delta}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
