import { http } from "../http/client";

export const pruebaApi = {
  get: () => http.get("/prueba/"),
};
