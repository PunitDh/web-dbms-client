import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import { webdbmsAPI } from "@/api/webdbmsAPI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebDBMS",
  description: "Web-based PostGreSQL management system",
  icons: { icon: "./favicon.ico" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tablesResponse = await webdbmsAPI.getAllTables();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar tables={tablesResponse.tables} />
        {children}
      </body>
    </html>
  );
}
