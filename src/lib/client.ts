import createClient from "openapi-fetch";
import type { paths } from "@/common/api/apis";

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});
