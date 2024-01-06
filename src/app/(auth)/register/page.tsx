import FormRegister from "@/components/pages/auth/form-register";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold mb-8 text-4xl">Register</h1>
      <FormRegister />
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;
