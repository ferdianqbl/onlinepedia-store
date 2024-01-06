"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const onSubmit = async (values: FieldValues) => {
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!data.status) {
      return setError(data.message);
    } else push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center font-bold mb-8 text-4xl">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <Input
              placeholder="Enter your name"
              type="text"
              required
              {...register("name", {
                required: "This field is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as any}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Enter your email"
              type="email"
              required
              {...register("email", {
                required: "This field is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message as any}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Enter your phone"
              type="tel"
              required
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^(\+62|62|0)8[1-9][0-9]{6,9}$/gm,
                  message: "Phone number must be valid",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message as any}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Enter your password"
              type="password"
              required
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message:
                    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as any}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Enter your password"
              type="password"
              required
              {...register("confirmPassword", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message:
                    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number",
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message as any}
              </p>
            )}
          </div>
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Register
        </Button>
      </form>
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
