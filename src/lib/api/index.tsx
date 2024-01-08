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
}) {
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_URL}${url}`,
      data: body,
      headers,
    });
    const res = await response.data;
    return {
      error: 0,
      status: response.status,
      message: response.statusText,
      data: res,
    };
  } catch (error: any) {
    return {
      error: 1,
      status: error.code,
      message: error.message,
      data: null,
    };
  }
}
