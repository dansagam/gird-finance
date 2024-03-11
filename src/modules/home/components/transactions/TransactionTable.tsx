import { DataTableColumnType } from "@/@types/tableInterface";
import DataTable from "@/shared/data-table/DataTable";
import { format } from "date-fns";
import React from "react";
import { TransactionLIstType } from "../../mock/transaction-list";
import { formatNumber } from "@/utils/numberFormat";

type Props = Pick<
  React.ComponentProps<typeof DataTable<TransactionLIstType>>,
  "loading" | "dataSource" | "tableParams" | "setTableParams"
>;
function TransactionTable(props: Props) {
  const { tableParams, dataSource, setTableParams, loading } = props;

  const columns: DataTableColumnType<TransactionLIstType>[] = [
    {
      dataIndex: "sender",
      title: "Sender Account",
      filter: false,
      sorter: true,
      render(_row, col) {
        return (
          <div>
            <h2>{col?.sender || ""}</h2>
            <p>{col?.account || ""}</p>
          </div>
        );
      },
    },
    {
      dataIndex: "destination",
      title: "Destination Account",
      filter: false,
      sorter: true,
      render(_row, col) {
        return (
          <div>
            <h2>{col?.destinationBank || ""}</h2>
            <p>{col?.destination || ""}</p>
          </div>
        );
      },
    },
    {
      dataIndex: "amount",
      title: "Amount",
      filter: false,
      render(_row, col) {
        return <div>{formatNumber(col?.amount || 0, 2)}</div>;
      },
    },
    {
      dataIndex: "transactionID",
      title: "Transaction ID",
      filter: false,
    },
    {
      dataIndex: "status",
      title: "Status",
      filter: false,
    },
    {
      dataIndex: "transactionDate",
      title: "Last visit",
      filter: false,
      render(_row, col) {
        return <div>{col?.transactionDate ? format(new Date(col.transactionDate), "yyyy-MM-dd") : "--"}</div>;
      },
    },
  ];
  return (
    <DataTable
      columns={columns}
      loading={loading}
      tableParams={tableParams}
      setTableParams={setTableParams}
      dataSource={dataSource}
    />
  );
}

export default TransactionTable;
