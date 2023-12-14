import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import Provider from "@/lib/context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onlinepedia",
  description: "Onlinepedia is a free online encyclopedia",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider session={session}>
          <MantineProvider>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
