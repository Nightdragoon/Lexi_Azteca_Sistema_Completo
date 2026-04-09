import type { DashboardData } from "@/types";
import { http } from "../http/client";

/** Rutas legacy / adicionales usadas por integraciones o demos. */
export const legacyLexiApi = {
  getDashboardData: async (phoneNumber: string): Promise<DashboardData> => {
    const res = await http.get<DashboardData>(`/users/${phoneNumber}/dashboard`);
    if (!res) {
      throw new Error("Dashboard vacío");
    }
    return res;
  },
  simulateWhatsAppMessage: async (from: string, body: string) => {
    return http.post("/webhook/whatsapp", { From: from, Body: body });
  },
  triggerMission: async (phoneNumber: string, missionType: string) => {
    return http.post("/simulation/trigger-mission", { phoneNumber, missionType });
  },
};
