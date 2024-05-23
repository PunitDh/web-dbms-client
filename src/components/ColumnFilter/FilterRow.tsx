import { Column } from "@/types";
import React, { useMemo } from "react";

type Props = {
  column: Column;
  onChange: () => void;
  selectedColumns: string[];
};

const FilterRow = ({ column, onChange, selectedColumns }: Props) => {
  const checked = useMemo(
    () => selectedColumns.includes(column.column_name),
    [column.column_name, selectedColumns]
  );

  return (
    <tr>
      <td>
        <input
          checked={checked}
          id={column.column_name}
          type="checkbox"
          className="cursor-pointer"
          onChange={onChange}
          disabled={checked && selectedColumns.length === 1}
        />
      </td>
      <td>
        <label
          className={`cursor-pointer select-none ${
            checked ? "" : "line-through"
          }`}
          htmlFor={column.column_name}
        >
          {column.column_name}
        </label>
      </td>
    </tr>
  );
};

export default FilterRow;
