import { http } from "../http/client";

export const whatsappApi = {
  sendTemplate: (data: unknown) => http.post("/whatsapp/send-template", data),
  sendText: (data: unknown) => http.post("/whatsapp/send-text", data),
  updateToken: (data: unknown) => http.post("/whatsapp/update-token", data),
};
