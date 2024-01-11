import Navbar from "@/components/molecules/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="mt-24">{children}</main>
    </>
  );
};

export default Layout;
