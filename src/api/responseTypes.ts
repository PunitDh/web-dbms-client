export type TablesResponse = {
  tables: Table[];
};

export type TableResponse = {
  tablename: string;
  rows: DataRow[];
  columns: Column[];
  allColumns: Column[];
  order: SortOrder;
};

export type QueryResult = {
  query: string;
  rows: DataRow[];
  fields: Field[];
};

export type Table = {
  table_schema: string;
  table_name: string;
};

export type SearchParams = Record<string, string | string[] | undefined>;

type DataRow = Record<string, unknown>;

type Column = {
  column_name: string;
  data_type: string;
};

type Field = {
  name: string;
  tableID: number;
  columnID: number;
  dataTypeID: number;
  dataTypeSize: number;
  dataTypeModifier: number;
  format: string;
};

export type SortOrder = "asc" | "desc";