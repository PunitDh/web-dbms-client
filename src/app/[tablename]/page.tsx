import { webdbmsAPI } from "@/api/webdbmsAPI";
import DataTable from "../../components/DataTable";
import { SearchParams } from "@/types";
import ColumnFilter from "../../components/ColumnFilter";

type Props = {
  params: {
    tablename: string;
  };
  searchParams: SearchParams;
};

export default async function TableName({ params, searchParams }: Props) {
  const tableData = await webdbmsAPI.getTableData(
    params.tablename,
    searchParams
  );

  return (
    <>
      <h1 className="font-bold text-xl">Table `{tableData.tablename}`</h1>
      <ColumnFilter tableData={tableData} />
      <DataTable tableData={tableData} searchParams={searchParams} />
    </>
  );
}
