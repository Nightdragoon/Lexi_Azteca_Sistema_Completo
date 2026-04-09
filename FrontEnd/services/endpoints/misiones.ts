import type {
  AcceptMissionBody,
  CompleteMissionBody,
} from "@/types/api-missions";
import { http, type RequestPayload } from "../http/client";

/** Alineado al OpenAPI: grupo `misiones` (get_misiones_, post_misiones_, …). */
export const misionesApi = {
  /** GET `/misiones/` — Listar misiones disponibles */
  getAll: () => http.get("/misiones/"),
  /** POST `/misiones/` — Agregar misiones (admin / plantillas) */
  create: (data: RequestPayload) => http.post("/misiones/", data),
  /** POST `/misiones/aceptar` — Aceptar una misión */
  accept: (data: AcceptMissionBody) => http.post("/misiones/aceptar", data),
  /** GET `/misiones/activas/{user_id}` — Misiones activas del usuario */
  active: (userId: string | number) => http.get(`/misiones/activas/${userId}`),
  /** POST `/misiones/completar` — Marcar misión completada */
  complete: (data: CompleteMissionBody) => http.post("/misiones/completar", data),
};
