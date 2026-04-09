/** Obtiene `user_id` típico de la respuesta de login/registro. */
export function extractUserId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const o = payload as Record<string, unknown>;

  const nested = o.usuario ?? o.user;
  if (nested && typeof nested === "object") {
    const u = nested as Record<string, unknown>;
    if (u.user_id != null) return String(u.user_id);
    if (u.id != null) return String(u.id);
  }

  if (o.user_id != null) return String(o.user_id);
  if (o.id != null && typeof o.id === "number") return String(o.id);

  return null;
}
