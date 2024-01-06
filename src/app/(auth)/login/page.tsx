import Link from "next/link";
import FormLogin from "@/components/pages/auth/form-login";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold mb-8 text-4xl">Login</h1>
      <FormLogin />
      <p className="">
        {"Don't"} have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Page;
