import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebDBMS",
  description: "Web-based PostGreSQL management system",
  icons: { icon: "./favicon.ico" },
};

type Props = Readonly<{
  children: React.ReactNode;
  navigationBar: React.ReactNode;
}>;

export default async function RootLayout({ navigationBar, children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {navigationBar}
        <main className="flex flex-col justify-between px-8 gap-4 pt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
