import DataTable from "@/shared/data-table/DataTable";
import React from "react";

type Props = Pick<React.ComponentProps<typeof DataTable>, "loading" | "dataSource" | "tableParams" | "setTableParams">;
function TransactionTable(props: Props) {
  const { tableParams, dataSource, setTableParams, loading } = props;
  return (
    <DataTable
      columns={[]}
      loading={loading}
      tableParams={tableParams}
      setTableParams={setTableParams}
      dataSource={dataSource}
    />
  );
}

export default TransactionTable;
