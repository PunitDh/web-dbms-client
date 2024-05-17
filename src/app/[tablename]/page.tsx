import { webdbmsAPI } from "@/api/webdbmsAPI";
import DataTable from "../../components/DataTable";
import { SearchParams } from "@/api/responseTypes";

type Props = {
  params: {
    tablename: string;
  };
  searchParams: SearchParams;
};

export default async function TableName({ params, searchParams }: Props) {
  console.log(searchParams);
  
  const tableData = await webdbmsAPI.getTableData(params.tablename, searchParams);

  return (
    <main className="flex flex-col justify-between px-8 gap-4">
      <h1 className="font-bold text-xl">Table `{tableData.tablename}`</h1>
      <DataTable tableData={tableData} searchParams={searchParams} />
    </main>
  );
}
