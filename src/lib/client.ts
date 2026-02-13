import createClient from "openapi-fetch";
import type { paths } from "@/common/api/apis";
import { localTokenStorage } from "@/common/protocols/token-storage";

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
client.use({
  async onRequest({ request }) {
    const token = localTokenStorage.getToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
});

export { localTokenStorage as tokenStorage };
