import { TbTransfer } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { MdOutlineGppGood } from "react-icons/md";
import StatCardContainer from "@/components/StatCardContainer";
import TransactionStatCard from "../components/transactions/TransactionStatCard";
import TransactionTable from "../components/transactions/TransactionTable";
import useTableParams from "@/hooks/useTableParams";
import { transactionsList } from "../mock/transaction-list";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "@/routes/routes";

function Transactions() {
  const { tableParams, setTableParams } = useTableParams();
  const navigate = useNavigate();
  return (
    <div className=" py-2 px-5 bg-white">
      <div className=" grid gap-3">
        <StatCardContainer>
          {statsRenderArray({ failed: 50, pendings: 20, success: 10, total: 80 }).map((field, idx) => (
            <TransactionStatCard key={idx} {...field} />
          ))}
        </StatCardContainer>
        <div className=" flex justify-end items-center">
          <button
            onClick={() => {
              navigate(BASE_PATH.HOME);
            }}
            className=" bg-primary-main text-white py-3 px-3 rounded"
          >
            Make Tranasactions
          </button>
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

type ArrayProps = {
  total?: number;
  failed?: number;
  success?: number;
  pendings?: number;
};
const statsRenderArray = (values?: ArrayProps) => [
  {
    icon: TbTransfer,
    title: "Total transactions",
    count: values?.total || 0,
  },
  {
    icon: FaMoneyBillTransfer,
    title: "Total success",
    count: values?.success || 0,
  },
  {
    icon: MdSmsFailed,
    title: "Total Failed ",
    count: values?.failed || 0,
  },
  {
    icon: MdOutlineGppGood,
    title: "Total pending ",
    count: values?.pendings || 0,
  },
];
