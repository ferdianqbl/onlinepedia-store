import TableUsers from "@/components/pages/admin/users/table-users";

const Page = async () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <TableUsers />
    </div>
  );
};

export default Page;
