import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sage-Bob",
  description: "Your AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">

        <body className={inter.className}>{children}</body>

      </html>
    </UserProvider>

  );
}
