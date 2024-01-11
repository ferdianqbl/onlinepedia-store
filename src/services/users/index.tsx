import { callAPI } from "@/lib/api";

export async function getAllUsers(token: string) {
  const res = await callAPI({ method: "GET", url: "/api/users", token });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}

export async function deleteUser(id: string, token: string) {
  const res = await callAPI({
    method: "DELETE",
    url: `/api/users/${id}`,
    token,
  });
  return {
    error: res.error,
    message: res.message,
    data: res.data.data,
  };
}

export async function updateUser(id: string, data: any, token: string) {
  const res = await callAPI({
    method: "PUT",
    url: `/api/users`,
    token,
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
