/**
 * Modelo alineado al backend (OpenAPI / ejemplo de payload).
 * Los campos numéricos a veces vienen como string en JSON.
 */
export interface ApiMission {
  mission_id: string;
  mission_name: string;
  description: string;
  mision_type: string;
  status: string;
  time_limit_days: string | number | null;
  xp_drop: string | number;
  correct_answer: string | null;
  created_at: string;
  /** Si el backend envía avance (0–100) */
  progress_percent?: number | null;
  /** Fecha límite explícita si existe */
  deadline_at?: string | null;
  /** Categoría o tag para filtros UI */
  category?: string | null;
  /** Texto breve para el chip de tipo */
  difficulty?: "fácil" | "media" | "difícil" | string | null;
}

export type AcceptMissionBody = {
  user_id: string | number;
  mision_id: string | number;
};

export type CompleteMissionBody = {
  user_id: string | number;
  mision_id: string | number;
};
