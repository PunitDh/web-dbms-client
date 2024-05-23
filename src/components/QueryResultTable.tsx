"use client";

import { QueryResult, SearchParams } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Hyperlink from "./Hyperlink";
import { ChevronDownIcon, ChevronUpIcon } from "@nextui-org/shared-icons";
import { addSortToPathname } from "@/utils";
import { usePathname } from "next/navigation";

type Props = {
  tableData: QueryResult;
  searchParams: SearchParams;
};

const QueryResultTable = ({ tableData, searchParams }: Props) => {
  const pathname = usePathname();

  return (
    <Table
      aria-label="Query Result Table"
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {tableData.fields.map((field) => (
          <TableColumn className="px-6 py-3 text-center" key={field.name}>
            <span className="flex w-full items-center justify-center text-center">
              <Hyperlink
                href={addSortToPathname(pathname, searchParams, field.name)}
              >
                {field.name}
              </Hyperlink>
              {searchParams.sort === field.name &&
                (searchParams.order === "asc" ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronUpIcon />
                ))}
            </span>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent="No rows to display.">
        {tableData.rows.map((item, index) => (
          <TableRow
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {tableData.fields.map((field) => (
              <TableCell className="px-6 py-4 text-center" key={field.name}>
                {(item[field.name] as string) ?? "null"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QueryResultTable;
