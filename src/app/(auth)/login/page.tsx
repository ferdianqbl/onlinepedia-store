"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      setLoading(false);
      if (res?.error) throw new Error("Login failed");
      else push("/");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold mb-8 text-4xl">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter your email"
            type="email"
            required
            name="email"
          />

          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="password"
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="mt-4 mb-2">
        Login with{" "}
        <button
          type="button"
          onClick={() => {
            signIn("google", { callbackUrl: "/", redirect: false });
          }}
          className="text-blue-500"
        >
          Google
        </button>
      </p>
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
