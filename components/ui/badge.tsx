import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "live" | "muted" | "success" | "warning";
};

export function Badge({ className, tone = "muted", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        tone === "live" && "border-red-400/40 bg-red-500/15 text-red-200",
        tone === "muted" && "border-border bg-surface text-muted-foreground",
        tone === "success" &&
          "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
        tone === "warning" &&
          "border-amber-400/40 bg-amber-500/15 text-amber-100",
        className,
      )}
      {...props}
    />
  );
}
