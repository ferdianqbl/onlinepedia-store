import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const tokenVerify = () => {
  const bearerToken = headers().get("authorization");
  if (!bearerToken) throw new Error("No token provided");

  const token = bearerToken.split(" ")[1];
  const dataToken = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
  if (!dataToken) throw new Error("Invalid token");
  return dataToken;
};
