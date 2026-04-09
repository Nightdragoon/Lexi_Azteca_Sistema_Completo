"use client";

import { useEffect } from "react";
import { registerAccessTokenGetter } from "@/services/http/authContext";
import { useAppStore } from "@/store/useAppStore";

/**
 * Conecta el token de sesión del store con el cliente HTTP (header Authorization).
 * Cada petición llama al getter, que lee el estado actual de Zustand.
 */
export function ApiClientAuthBridge() {
  useEffect(() => {
    registerAccessTokenGetter(() => useAppStore.getState().accessToken ?? null);
  }, []);
  return null;
}
