import { sendRequest } from "./request";
import {
  QueryResult,
  SearchParams,
  TableResponse,
  TablesResponse,
} from "./responseTypes";

interface WebDBMSAPI {
  getAllTables: () => Promise<TablesResponse>;
  getTableData: (
    tablename: string,
    searchParams: SearchParams
  ) => Promise<TableResponse>;
  runQuery: (query: string) => Promise<QueryResult>;
}

export const webdbmsAPI: WebDBMSAPI = {
  getAllTables: () =>
    sendRequest<TablesResponse>({
      endpoint: "/",
      method: "GET",
    }),

  getTableData: (tablename: string, searchParams: SearchParams) =>
    sendRequest<TableResponse>({
      endpoint: `/${tablename}?${getFilters(searchParams).toString()}`,
      method: "GET",
    }),

  runQuery: (query: string) =>
    sendRequest<QueryResult>({
      endpoint: "/",
      method: "POST",
      body: { query },
    }),
};

function getFilters(
  searchParams: Record<string, string | string[] | undefined>
): URLSearchParams {
  const filters = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        filters.append(key, item);
      });
    } else {
      value && filters.append(key, value);
    }
  });
  return filters;
}
