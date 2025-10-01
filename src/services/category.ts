import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

const token = await getCookieServer();

export async function getCategories() {
  const response = await api.get("/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
