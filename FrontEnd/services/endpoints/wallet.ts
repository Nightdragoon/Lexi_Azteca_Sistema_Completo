import { http } from "../http/client";

/** Alineado al OpenAPI: grupo `wallet` (simulador). */
export const walletApi = {
  /** GET `/simulador/historial/{user_id}` — Historial de transacciones */
  historial: (userId: string | number) => http.get(`/simulador/historial/${userId}`),
  /** POST `/simulador/transaccion` — Registrar una transacción */
  transaction: (data: unknown) => http.post("/simulador/transaccion", data),
  /** POST `/simulador/wallet/start` — Iniciar wallet del usuario */
  start: (data: unknown) => http.post("/simulador/wallet/start", data),
  /** GET `/simulador/wallet/{user_id}` — Información del wallet */
  data: (userId: string | number) => http.get(`/simulador/wallet/${userId}`),
};
