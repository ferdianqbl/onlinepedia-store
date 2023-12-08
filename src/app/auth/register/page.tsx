"use client";
import { Form, useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import Input from "@/components/atom/input";

const Page = () => {
  const form = useForm();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form form={form} className="w-1/4 flex flex-col gap-4">
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
          <Input
            placeholder="Enter your password"
            type="password"
            required
            name="confirmPassword"
          />
        </div>
        <Button type="submit" variant="filled" fullWidth>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Page;
