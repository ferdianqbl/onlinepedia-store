import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onlinepedia",
  description: "Onlinepedia is a free online encyclopedia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <SessionProvider> */}
        <MantineProvider>{children}</MantineProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
