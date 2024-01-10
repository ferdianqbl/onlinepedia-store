import { callAPI } from "@/lib/api";

export async function getAllUsers() {
  const res = await callAPI({ method: "GET", url: "/api/users" });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}

export async function deleteUser(id: string) {
  const res = await callAPI({ method: "DELETE", url: `/api/users/${id}` });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}

export async function updateUser(id: string, data: any) {
  const res = await callAPI({
    method: "PUT",
    url: `/api/users`,
    body: {
      id,
      data: {
        ...data,
      },
    },
  });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}
