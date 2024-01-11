"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { updateUser } from "@/services/users";
import { useSession } from "next-auth/react";

type Props = {
  data: any;
  setTrigger: () => void;
};

const EditUser: React.FC<Props> = ({ data, setTrigger }) => {
  const session: any = useSession();
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<string>(data.role);
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  });

  const onSubmit = async (values: FieldValues) => {
    const token = session?.data?.accessToken;
    setError("");
    const res = await updateUser(
      data.id,
      {
        ...values,
        role,
      },
      token
    );
    if (res.error) {
      console.log(res.message);
      setError(res.message);
    } else setTrigger();

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="p-1 text-blue-600 hover:text-blue-600/80 w-6 h-6"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form
          action=""
          className="w-ful flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* {
            <p className="text-red-600 text-sm">{error && error}</p>
          } */}
          <div className="flex flex-col gap-2 w-fu">
            <Input
              id="name"
              type="text"
              disabled
              {...register("name", {
                required: "This field is required",
              })}
            />
            <Input
              disabled
              id="email"
              type="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
            <Input disabled id="phone" {...register("phone")} />
            <Select
              {...register("role")}
              onValueChange={(value) => setRole(value)}
              defaultValue={data.role}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
