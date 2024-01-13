"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/services/users";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { uploadImage } from "@/lib/firebase/services";

const UserInformation = () => {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const session: any = useSession();
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(
    "https://source.unsplash.com/random/300x300?person"
  );

  const getData = async () => {
    const res = await getUser(
      session?.data?.user?.id,
      session?.data?.accessToken
    );
    if (!res.error) {
      setUser(res.data);
      setValue("name", res.data.name);
      setValue("email", res.data.email);
      setValue("phone", res.data.phone);
      if (res.data.image) {
        setImagePreview(res.data.image);
      }
    }
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files && e.target.files[0];
    if (!img) {
      setImagePreview("https://source.unsplash.com/random/300x300?person");
      setImage(null);
    } else {
      setImagePreview(URL.createObjectURL(img));
      setImage(img);
    }
  };

  const onSubmit = async (values: FieldValues) => {
    let imageUrl: {
      error: number;
      message: string;
      data: string | null;
    } = { error: 1, message: "", data: null };

    if (image) {
      imageUrl = await uploadImage(session?.data?.user?.id, image);
    }
    const data = {
      ...values,
      image: !imageUrl.error ? imageUrl.data : null,
    };

    const res = await updateUser(
      session?.data?.user?.id,
      data,
      session?.data?.accessToken
    );
    if (!res.error) {
      setError("");
      getData();
    } else {
      setError(res.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 w-full">
        <div className="">
          <label htmlFor="avatar">
            <Image
              src={imagePreview}
              width={200}
              height={200}
              className="rounded-full aspect-square object-cover object-center"
              alt="user profile picture"
            />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            accept="image/*"
            onChange={imageHandler}
          />
        </div>
        <div className="w-full border p-4 rounded-md flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <Input
              placeholder="Name"
              id="name"
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              placeholder="Email"
              id="email"
              type="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              placeholder="Phone"
              id="phone"
              type="tel"
              {...register("phone")}
            />
          </div>
          <Button
            className="w-fit"
            type="submit"
            size={"sm"}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserInformation;
