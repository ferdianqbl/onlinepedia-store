import Sidebar from "@/components/molecules/sidebar";
import Header from "@/components/molecules/sidebar/header";
import { authOptions } from "@/lib/next-auth/auth";
import { DefaultSession, Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type SessionType = {
  user: {
    role?: string;
  } & DefaultSession;
} & Session;

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session: SessionType | null = await getServerSession(authOptions);
  if (!session || session?.user.role !== "admin") redirect("/");
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
