"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSession } from "next-auth/react";

const UserInformation = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <form action="">
      <div className="flex gap-3 w-full">
        <div className="">
          <Image
            src="https://source.unsplash.com/random/300x300?person"
            width={200}
            height={200}
            className="rounded-full"
            alt="user profile picture"
          />
        </div>
        <div className="w-full border p-4 rounded-md flex flex-col gap-3">
          <div className="flex flex-col w-full">
            <Input placeholder="Name" id="name" type="text" />
          </div>
          <div className="flex flex-col w-full">
            <Input placeholder="Email" id="email" type="email" />
          </div>
          <div className="flex flex-col w-full">
            <Input placeholder="Phone" id="phone" type="tel" />
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
