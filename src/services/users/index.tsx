import { callAPI } from "@/lib/api";

export async function getAllUsers() {
  const { data } = await callAPI({ method: "GET", url: "/api/users" });
  return data;
}
