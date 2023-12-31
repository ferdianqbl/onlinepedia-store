"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

const FormLogin = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (values: FieldValues) => {
    try {
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
      if (res?.error) throw new Error("Login failed");
      push("/");
    } catch (error: any) {
      setError(error.message);
      reset();
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col gap-4"
      >
        <p className="text-red-500 text-center font-bold text-md">{error}</p>
        <div className="flex flex-col gap-2">
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
              placeholder="Enter your password"
              type="password"
              required
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as any}
              </p>
            )}
          </div>
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
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
    </>
  );
};

export default FormLogin;
