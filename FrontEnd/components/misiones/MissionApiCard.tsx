"use client";

import {
  CalendarClock,
  ChevronRight,
  Flame,
  Tag,
  Trophy,
} from "lucide-react";
import type { ApiMission } from "@/types/api-missions";
import {
  formatDaysLimit,
  missionXp,
} from "@/utils/missions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

function statusStyles(status: string) {
  const s = status.toLowerCase();
  if (s.includes("dispon")) {
    return "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-100";
  }
  if (s.includes("activ") || s.includes("progreso")) {
    return "border-primary/30 bg-primary/10 text-primary";
  }
  if (s.includes("complet")) {
    return "border-muted-foreground/20 bg-muted text-muted-foreground";
  }
  return "border-border bg-muted/40 text-foreground";
}

export function MissionApiCard({
  mission,
  mode,
  busy,
  onPrimary,
  primaryLabel,
}: {
  mission: ApiMission;
  mode: "catalog" | "active";
  busy?: boolean;
  onPrimary?: () => void;
  primaryLabel: string;
}) {
  const xp = missionXp(mission);
  const days = formatDaysLimit(mission);
  const typeLabel = mission.mision_type || "misión";

  return (
    <Card className="overflow-hidden border border-border/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold leading-tight text-foreground">
              {mission.mission_name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                statusStyles(mission.status)
              )}
            >
              {mission.status}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {mission.description}
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1 font-medium text-foreground/90">
              <Tag className="size-3.5 shrink-0 opacity-70" aria-hidden />
              {typeLabel}
            </span>
            {mission.category ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1">
                {mission.category}
              </span>
            ) : null}
            {days ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1">
                <CalendarClock className="size-3.5 opacity-70" aria-hidden />
                {days}
              </span>
            ) : null}
            {mission.difficulty ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/25 bg-amber-400/10 px-2 py-1 text-amber-950 dark:text-amber-100">
                <Flame className="size-3.5" aria-hidden />
                {mission.difficulty}
              </span>
            ) : null}
          </div>
          {mode === "active" &&
          typeof mission.progress_percent === "number" &&
          mission.progress_percent >= 0 ? (
            <div className="pt-1">
              <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                <span>Progreso</span>
                <span className="tabular-nums font-semibold text-foreground">
                  {Math.min(100, Math.round(mission.progress_percent))}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(0, mission.progress_percent))}%`,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
          <div className="inline-flex items-center gap-1.5 self-start rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 sm:self-end">
            <Trophy className="size-4 text-amber-600 dark:text-amber-300" aria-hidden />
            <span className="text-sm font-bold tabular-nums text-foreground">
              +{xp} XP
            </span>
          </div>
          {onPrimary ? (
            <Button
              type="button"
              className="w-full gap-2 sm:w-auto"
              disabled={busy}
              onClick={onPrimary}
            >
              {primaryLabel}
              <ChevronRight className="size-4 opacity-70" aria-hidden />
            </Button>
          ) : null}
        </div>
      </div>
      {mission.created_at ? (
        <p className="mt-4 border-t border-border/50 pt-3 text-[10px] text-muted-foreground">
          Creada: {mission.created_at}
        </p>
      ) : null}
    </Card>
  );
}
