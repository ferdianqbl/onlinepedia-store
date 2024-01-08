import axios from "axios";

export async function callAPI({
  method,
  url,
  body,
  token,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: FormData | string;
  token?: string;
  query?: string;
}) {
  return axios({
    method,
    url,
    data: body ? body : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
