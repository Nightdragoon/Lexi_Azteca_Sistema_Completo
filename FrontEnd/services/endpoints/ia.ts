import { http } from "../http/client";

export const iaApi = {
  conversation: (data: unknown) => http.post("/ia/conversation", data),
  helloWorld: () => http.get("/ia/hello_world"),
};
