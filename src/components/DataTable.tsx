"use client";

import { SearchParams, TableResponse } from "@/api/responseTypes";
import Hyperlink from "@/components/Hyperlink";
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
        {tableData.columns.map((column) => (
          <TableColumn
            className="px-6 py-3"
            key={column.column_name}
          >
            <span className="flex w-full items-center justify-center text-center">
              <Hyperlink
                href={`${pathname}?sort=${column.column_name}&order=${
                  searchParams.order === "asc" &&
                  searchParams.sort === column.column_name
                    ? "desc"
                    : "asc"
                }`}
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
      <TableBody items={tableData.rows} emptyContent={"No rows to display."}>
        {(item) => (
          <TableRow className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {(columnKey) => (
              <TableCell className="px-6 py-4 text-center">
                {(item[columnKey] as string) ?? "null"}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
