import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Hyperlink from "@/components/Hyperlink";
import { webdbmsAPI } from "@/api/webdbmsAPI";

export default async function NavigationBar() {
  const tablesResponse = await webdbmsAPI.getAllTables();

  return (
    <Navbar position="static" className="flex items-center p-4">
      <NavbarBrand className="flex w-2/6">
        <Hyperlink
          className="flex w-full items-center text-black hover:text-black no-underline"
          href="/"
        >
          <Image
            src="/logo.png"
            alt="WebDBMS Logo"
            className="dark:invert"
            width={100}
            height={100}
            priority
          />
          <p className="font-bold text-inherit">WebDBMS</p>
        </Hyperlink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
        <NavbarItem>
          <Hyperlink href="/">Home</Hyperlink>
        </NavbarItem>
        {tablesResponse.tables.map((table) => (
          <NavbarItem key={table.table_name}>
            <Hyperlink href={`/${table.table_name}`}>
              {table.table_name}
            </Hyperlink>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Hyperlink href="/settings">Settings</Hyperlink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
