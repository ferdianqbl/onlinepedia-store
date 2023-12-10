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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 8)
          return "Password must be at least 8 characters long";
      },
      confirmPassword: (value, values) => {
        if (value !== values.password) {
          return "Passwords do not match";
        }
      },
      name: (value) => {
        if (!value) return "Name must be at least 3 characters long";
      },
      phone: (value, values) => {
        if (value && !/^\d+$/.test(value)) return "Invalid phone number";
      },
    },
  });

  const handleSubmit = async (values: {
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
    console.log(data);
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
        onSubmit={form.onSubmit(handleSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Enter your name"
            type="text"
            required
            name="name"
            {...form.getInputProps("name")}
          />
          <Input
            placeholder="Enter your email"
            type="email"
            required
            name="email"
            {...form.getInputProps("email")}
          />
          <Input
            placeholder="Enter your phone"
            type="tel"
            required
            name="phone"
            {...form.getInputProps("phone")}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="password"
            {...form.getInputProps("password")}
          />
          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="confirmPassword"
            {...form.getInputProps("confirmPassword")}
          />
        </div>
        <Button disabled={loading} type="submit" variant="filled" fullWidth>
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
