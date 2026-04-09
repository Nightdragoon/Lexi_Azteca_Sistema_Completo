import type { ApiMission } from "@/types/api-missions";

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

/** Normaliza un objeto suelto del API a `ApiMission`. */
export function normalizeMission(raw: unknown): ApiMission | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  const id = str(m.mission_id ?? m.misionId ?? m.acc_mission_id ?? m.missionId);
  if (!id) return null;

  return {
    mission_id: id,
    mission_name: str(m.mission_name ?? m.missionName ?? "Misión"),
    description: str(m.description ?? ""),
    mision_type: str(m.mision_type ?? m.mission_type ?? "general"),
    status: str(m.status ?? "disponible"),
    time_limit_days: (() => {
      const v = m.time_limit_days ?? m.timeLimitDays;
      if (v === null || v === undefined) return null;
      if (typeof v === "number" || typeof v === "string") return v;
      return null;
    })(),
    xp_drop: (() => {
      const v = m.xp_drop ?? m.xpDrop ?? 0;
      if (typeof v === "number" || typeof v === "string") return v;
      return 0;
    })(),
    correct_answer:
      m.correct_answer === undefined || m.correct_answer === null
        ? null
        : str(m.correct_answer),
    created_at: str(m.created_at ?? m.createdAt ?? ""),
    progress_percent:
      typeof m.progress_percent === "number"
        ? m.progress_percent
        : typeof m.progress === "number"
          ? m.progress
          : null,
    deadline_at: m.deadline_at ? str(m.deadline_at) : null,
    category: m.category ? str(m.category) : null,
    difficulty: m.difficulty ? str(m.difficulty) : null,
  };
}

export function parseMissionList(raw: unknown): ApiMission[] {
  if (raw === null || raw === undefined) return [];
  if (Array.isArray(raw)) {
    return raw.map(normalizeMission).filter(Boolean) as ApiMission[];
  }
  if (typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    if (Array.isArray(o.data)) {
      return parseMissionList(o.data);
    }
    if (Array.isArray(o.misiones)) {
      return parseMissionList(o.misiones);
    }
    if (Array.isArray(o.results)) {
      return parseMissionList(o.results);
    }
  }
  return [];
}

export function missionXp(m: ApiMission): number {
  const n = Number(m.xp_drop);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export function formatDaysLimit(m: ApiMission): string | null {
  if (m.time_limit_days === null || m.time_limit_days === undefined) {
    return null;
  }
  const n = Number(m.time_limit_days);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n === 1 ? "1 día" : `${Math.round(n)} días`;
}
