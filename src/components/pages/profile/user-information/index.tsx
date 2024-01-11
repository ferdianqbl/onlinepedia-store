"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getUser } from "@/services/users";
import { useEffect, useState } from "react";

const UserInformation = () => {
  const session: any = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const getData = async () => {
    const res = await getUser(
      session?.data?.user?.id,
      session?.data?.accessToken
    );
    if (!res.error) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <form action="">
      <div className="flex gap-3 w-full">
        <div className="">
          <label htmlFor="avatar">
            <Image
              src={
                user.image ??
                "https://source.unsplash.com/random/300x300?person"
              }
              width={200}
              height={200}
              className="rounded-full"
              alt="user profile picture"
            />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="w-full border p-4 rounded-md flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <Input placeholder="Name" id="name" type="text" value={user.name} />
          </div>
          <div className="flex flex-col w-full">
            <Input
              placeholder="Email"
              id="email"
              type="email"
              value={user.email}
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              placeholder="Phone"
              id="phone"
              type="tel"
              value={user.phone}
            />
          </div>
          <Button className="w-fit" type="submit" size={"sm"}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserInformation;
