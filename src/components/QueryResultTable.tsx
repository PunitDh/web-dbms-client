"use client";

import { QueryResult } from "@/api/responseTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

type Props = {
  tableData: QueryResult;
};

const QueryResultTable = ({ tableData }: Props) => (
  <Table
    aria-label="Data Table"
    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {tableData.fields.map((field) => (
        <TableColumn className="px-6 py-3 text-center" key={field.name}>
          {field.name}
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

export default QueryResultTable;
