import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export async function getCategories() {
  const token = await getCookieServer();
  const response = await api.get("/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
