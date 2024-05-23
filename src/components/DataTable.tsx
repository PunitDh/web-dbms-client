"use client";

import { SearchParams, TableResponse } from "@/types";
import Hyperlink from "@/components/Hyperlink";
import { addSortToPathname } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ChevronDownIcon, ChevronUpIcon } from "@nextui-org/shared-icons";
import { usePathname } from "next/navigation";

type Props = {
  tableData: TableResponse;
  searchParams: SearchParams;
};

const DataTable = ({ tableData, searchParams }: Props) => {
  const pathname = usePathname();

  return (
    <Table
      aria-label="Data Table"
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {tableData.columns.map((column, index) => (
          <TableColumn className="px-6 py-3" key={column.column_name || index}>
            <span className="flex w-full items-center justify-center text-center">
              <Hyperlink
                href={addSortToPathname(
                  pathname,
                  searchParams,
                  column.column_name
                )}
              >
                {column.column_name} ({column.data_type})
              </Hyperlink>
              {searchParams.sort === column.column_name &&
                (searchParams.order === "asc" ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronUpIcon />
                ))}
            </span>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody items={tableData.rows} emptyContent="No rows to display.">
        {tableData.rows.map((item, index) => (
          <TableRow
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            {tableData.columns.map((column) => (
              <TableCell
                className="px-6 py-4 text-center"
                key={column.column_name}
              >
                {(item[column.column_name] as string) ?? "null"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
