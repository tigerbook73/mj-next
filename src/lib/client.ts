import createClient from "openapi-fetch";
import type { paths } from "@/common/api/apis";
import { LocalStorageTokenStorage } from "@/common/protocols/token-storage";

export const tokenStorage = new LocalStorageTokenStorage();

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
client.use({
  async onRequest({ request }) {
    const token = tokenStorage.getToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
});
