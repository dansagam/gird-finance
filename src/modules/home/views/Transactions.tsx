import { TbTransfer } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { MdOutlineGppGood } from "react-icons/md";
import StatCardContainer from "@/components/StatCardContainer";
import TransactionStatCard from "../components/transactions/TransactionStatCard";
import TransactionTable from "../components/transactions/TransactionTable";
import useTableParams from "@/hooks/useTableParams";
import { transactionsList } from "../mock/transaction-list";

function Transactions() {
  const { tableParams, setTableParams } = useTableParams();
  return (
    <div>
      <div className=" grid gap-3">
        <StatCardContainer>
          {statsRenderArray().map((field, idx) => (
            <TransactionStatCard key={idx} {...field} />
          ))}
        </StatCardContainer>
        <div>
          <button>Make Tranasactions</button>
        </div>
        <div>List of Transactions</div>
        <div>
          <TransactionTable
            tableParams={tableParams}
            setTableParams={setTableParams}
            loading={false}
            dataSource={transactionsList}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;

const statsRenderArray = () => [
  {
    icon: TbTransfer,
    title: "Total transactions",
    count: 300,
  },
  {
    icon: FaMoneyBillTransfer,
    title: "Total success",
    count: 300,
  },
  {
    icon: MdSmsFailed,
    title: "Total Failed ",
    count: 300,
  },
  {
    icon: MdOutlineGppGood,
    title: "Total pending ",
    count: 300,
  },
];
