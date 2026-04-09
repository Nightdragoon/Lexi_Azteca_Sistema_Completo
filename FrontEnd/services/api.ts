/**
 * Facade del cliente API: mantiene `api.*` y `lexiApi` para no romper importaciones existentes.
 * Implementación por dominio en `services/endpoints/*`; transporte en `services/http/*`.
 */
export { ApiError, isApiError } from "./http/errors";
export { registerAccessTokenGetter } from "./http/authContext";

import { iaApi } from "./endpoints/ia";
import { pruebaApi } from "./endpoints/prueba";
import { usuarioApi } from "./endpoints/usuario";
import { whatsappApi } from "./endpoints/whatsapp";
import { misionesApi } from "./endpoints/misiones";
import { walletApi } from "./endpoints/wallet";
import { legacyLexiApi } from "./endpoints/dashboard";

/**
 * Cliente agrupado por dominio (OpenAPI).
 * - `misiones`: GET/POST `/misiones/`, POST `/misiones/aceptar`, GET `/misiones/activas/{user_id}`, …
 * - `wallet`: GET `/simulador/historial/{user_id}`, POST `/simulador/transaccion`, POST `/simulador/wallet/start`, GET `/simulador/wallet/{user_id}`
 */
export const api = {
  ia: iaApi,
  prueba: pruebaApi,
  usuario: usuarioApi,
  whatsapp: whatsappApi,
  misiones: misionesApi,
  wallet: walletApi,
};

export const lexiApi = legacyLexiApi;
