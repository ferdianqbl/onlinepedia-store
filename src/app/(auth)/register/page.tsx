"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!data.status) {
      setLoading(false);
      return setError(data.message);
    }
    push("/login");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className=" text-center font-bold mb-8 text-4xl">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter your name"
            type="text"
            required
            name="name"
          />
          <Input
            placeholder="Enter your email"
            type="email"
            required
            name="email"
          />
          <Input
            placeholder="Enter your phone"
            type="tel"
            required
            name="phone"
          />
          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="password"
          />
          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="confirmPassword"
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Page;
