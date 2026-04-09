/** Interpreta distintas formas habituales de devolver JWT en login. */
export function extractAccessToken(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const o = payload as Record<string, unknown>;
  for (const key of ["access_token", "accessToken", "token", "jwt"]) {
    const v = o[key];
    if (typeof v === "string" && v.length > 0) {
      return v;
    }
  }
  return null;
}
