import { callAPI } from "@/lib/api";

export async function getAllUsers() {
  const res = await callAPI({ method: "GET", url: "/api/users" });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}
