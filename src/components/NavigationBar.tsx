import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Hyperlink from "./Hyperlink";
import { Table } from "@/api/responseTypes";

type Props = {
  tables: Table[];
};

const NavigationBar = ({ tables }: Props) => (
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
      {tables.map((table) => (
        <NavbarItem key={table.table_name}>
          <Hyperlink href={`/${table.table_name}`}>
            {table.table_name}
          </Hyperlink>
        </NavbarItem>
      ))}
    </NavbarContent>
  </Navbar>
);

export default NavigationBar;
