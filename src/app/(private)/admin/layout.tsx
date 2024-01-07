import Sidebar from "@/components/molecules/sidebar";
import Header from "@/components/molecules/sidebar/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="pt-20 md:pt-0 flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
