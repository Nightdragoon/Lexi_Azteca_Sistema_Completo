import { assertApiConfigured } from "./config";
import { getAccessToken } from "./authContext";
import { ApiError } from "./errors";

export type ApiRequestOptions = RequestInit & {
  /** Si true, no adjunta Bearer aunque haya token (p. ej. login). */
  skipAuth?: boolean;
};

export type RequestPayload = unknown;

function buildUrl(endpoint: string): string {
  const base = assertApiConfigured();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  if (!base) {
    return path;
  }
  return `${base}${path}`;
}

function mergeHeaders(
  init: RequestInit,
  extra: Record<string, string>
): Headers {
  const h = new Headers(init.headers ?? {});
  for (const [k, v] of Object.entries(extra)) {
    if (v) h.set(k, v);
  }
  return h;
}

/**
 * Cliente HTTP único para el backend Lexi. Usar desde `services/endpoints/*`.
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T | null> {
  const { skipAuth, ...fetchInit } = options;
  const url = buildUrl(endpoint);

  const headers = mergeHeaders(fetchInit, {
    "Content-Type": "application/json",
  });

  const token = !skipAuth ? getAccessToken() : null;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[lexi-api] ${fetchInit.method ?? "GET"} ${url}`);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...fetchInit,
      headers,
    });
  } catch (e) {
    console.error(`[lexi-api] red falló ${endpoint}`, e);
    throw e;
  }

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      try {
        errorBody = await response.text();
      } catch {
        errorBody = null;
      }
    }

    const msgFromBody =
      errorBody &&
      typeof errorBody === "object" &&
      ("error" in errorBody || "message" in errorBody)
        ? String(
            (errorBody as { error?: string; message?: string }).error ??
              (errorBody as { message?: string }).message
          )
        : null;

    throw new ApiError(
      response.status,
      msgFromBody || `Error ${response.status}: ${response.statusText}`,
      errorBody
    );
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError(
      response.status,
      "Respuesta no JSON del servidor",
      text
    );
  }
}

export const http = {
  get: <T = unknown>(endpoint: string, options: ApiRequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),
  post: <T = unknown>(
    endpoint: string,
    data?: RequestPayload,
    options: ApiRequestOptions = {}
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data === undefined ? undefined : JSON.stringify(data),
    }),
  put: <T = unknown>(
    endpoint: string,
    data?: RequestPayload,
    options: ApiRequestOptions = {}
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data === undefined ? undefined : JSON.stringify(data),
    }),
  delete: <T = unknown>(endpoint: string, options: ApiRequestOptions = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
