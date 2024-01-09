"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/services/users";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import EditUser from "./edit-user";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
};

const TableUsers = () => {
  const [users, setUsers] = useState<UserType[] | []>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const getAllData = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const deleteHandler = async (id: string) => {
    const res = await deleteUser(id);
    if (res.error) {
      alert(res.message);
    }
    getAllData();
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Table className="border mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="">{user.email}</TableCell>
            <TableCell className="">{user.phone}</TableCell>
            <TableCell className="">{user.role}</TableCell>
            <TableCell className="">{user.createdAt.seconds}</TableCell>
            <TableCell className="">{user.updatedAt.seconds}</TableCell>
            <TableCell className="flex items-center gap-1">
              <EditUser data={user} setTrigger={() => setTrigger(!trigger)} />
              <Button
                variant={"outline"}
                className="p-1 text-red-600 hover:text-red-600/80 w-6 h-6"
                onClick={() => deleteHandler(user.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableUsers;
