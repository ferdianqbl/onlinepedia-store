"use client";
import { TextInput } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

type InputProps = {
  className?: string;
} & TextInputProps;

const Input = ({ className, ...rest }: InputProps) => {
  return <TextInput {...rest} className={className} autoComplete="nope" />;
};

export default Input;
