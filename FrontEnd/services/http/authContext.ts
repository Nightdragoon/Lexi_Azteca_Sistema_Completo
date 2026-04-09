/**
 * Punto de enganche para enviar `Authorization` sin acoplar el fetch a Zustand.
 * Se registra una vez desde `ApiClientAuthBridge` leyendo el store.
 */
let accessTokenGetter: () => string | null | undefined = () => null;

export function registerAccessTokenGetter(
  fn: () => string | null | undefined
): void {
  accessTokenGetter = fn;
}

export function getAccessToken(): string | null {
  const t = accessTokenGetter();
  return t?.trim() ? t.trim() : null;
}
