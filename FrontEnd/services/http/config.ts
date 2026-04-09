/**
 * URL pública del API (browser). Debe definirse en `.env.local`:
 * `NEXT_PUBLIC_API_URL=https://tu-api.com`
 *
 * Opcional: usar el proxy de Next (`/api_proxy`) para evitar CORS en desarrollo,
 * p. ej. `NEXT_PUBLIC_API_URL=/api_proxy`.
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
  return raw.replace(/\/$/, "");
}

export function assertApiConfigured(): string {
  const base = getApiBaseUrl();
  if (!base && typeof window !== "undefined") {
    console.warn(
      "[lexi-api] NEXT_PUBLIC_API_URL no está definida; las peticiones fallarán."
    );
  }
  return base;
}
