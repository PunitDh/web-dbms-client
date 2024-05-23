"use client";

import { TableResponse } from "@/types";
import React, { useMemo, useState } from "react";
import FilterRow from "./FilterRow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  tableData: TableResponse;
};

const ColumnFilter = ({ tableData }: Props) => {
  const intersection = useMemo(
    () =>
      tableData.allColumns
        .filter((allColumn) =>
          tableData.columns.map(
            (column) => column.column_name === allColumn.column_name
          )
        )
        .map((column) => column.column_name),
    [tableData.allColumns, tableData.columns]
  );

  const [selectedColumns, setSelectedColumns] = useState(intersection);
  const currentSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of currentSearchParams.entries()) {
      searchParams.append(key, value);
    }

    if (e.target.checked) {
      searchParams.delete("columns");
    } else {
      searchParams.append("columns", tableData.allColumns[0]?.column_name);
    }

    setSelectedColumns((selectedColumns) =>
      selectedColumns.length === 1
        ? tableData.allColumns.map((column) => column.column_name)
        : [tableData.allColumns[0]?.column_name]
    );

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  const handleChange = (checked: string) => () => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of currentSearchParams.entries()) {
      searchParams.append(key, value);
    }

    const newColumns = selectedColumns.includes(checked)
      ? selectedColumns.filter((column) => column !== checked)
      : [...selectedColumns, checked];

    searchParams.delete("columns");
    newColumns.forEach((column) => searchParams.append("columns", column));
    setSelectedColumns(newColumns);

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <table className="w-1/6">
      <thead>
        <tr>
          <td colSpan={2} className="font-bold">
            Select columns
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              checked={selectedColumns.length === tableData.allColumns.length}
              id="select-all"
              type="checkbox"
              className="cursor-pointer"
              onChange={handleSelectAll}
            />
          </td>
          <td>
            <label className="cursor-pointer select-none" htmlFor="select-all">
              Select / Unselect All
            </label>
          </td>
        </tr>
        {tableData.allColumns.map((column) => (
          <FilterRow
            key={column.column_name}
            column={column}
            onChange={handleChange(column.column_name)}
            selectedColumns={selectedColumns}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ColumnFilter;
