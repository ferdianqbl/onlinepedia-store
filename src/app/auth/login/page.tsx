"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import Input from "@/components/atom/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 8)
          return "Password must be at least 8 characters long";
      },
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    // setLoading(true);
    // setError("");
    // const res = await fetch("/api/auth/register", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    // });
    // const data = await res.json();
    // console.log(data);
    // if (!data.status) {
    //   setLoading(false);
    //   return setError(data.message);
    // }
    // push("/auth/login");
    // setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-center font-bold mb-8 text-4xl">Login</h1>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter your email"
            type="email"
            required
            name="email"
            {...form.getInputProps("email")}
          />

          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="password"
            {...form.getInputProps("password")}
          />
        </div>
        <Button disabled={loading} type="submit" variant="filled" fullWidth>
          Login
        </Button>
      </form>
      <p className="text-white">
        {"Don't"} have an account?{" "}
        <Link href="/auth/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Page;
