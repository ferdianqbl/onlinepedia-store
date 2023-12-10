import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
