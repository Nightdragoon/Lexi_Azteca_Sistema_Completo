import { http } from "../http/client";

export type LoginPayload = {
  user_name: string;
  password: string;
  user_phone: string;
};

export type RegisterPayload = {
  user_name: string;
  password: string;
  user_phone: string;
  onboarding: boolean;
};

export const usuarioApi = {
  getAll: () => http.get("/usuario/"),
  create: (data: RegisterPayload) => http.post("/usuario/", data),
  login: (credentials: LoginPayload) =>
    http.post("/usuario/login", credentials, { skipAuth: true }),
  delete: (userId: string) => http.delete(`/usuario/${userId}`),
  getById: (userId: string) => http.get(`/usuario/${userId}`),
  update: (userId: string, data: unknown) => http.put(`/usuario/${userId}`, data),
};
