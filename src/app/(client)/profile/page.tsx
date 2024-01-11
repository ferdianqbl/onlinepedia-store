import UserInformation from "@/components/pages/profile/user-information";

const Page = () => {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Profile Management</h1>
      <div className="mt-8">
        <UserInformation />
      </div>
    </div>
  );
};

export default Page;
