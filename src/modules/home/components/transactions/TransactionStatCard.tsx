import { ISvgIcon } from "@/@types/baseInterface";

type TransactionStatCardProps = {
  icon: ISvgIcon;
  title: string;
  count: number | string;
};
function TransactionStatCard(props: TransactionStatCardProps) {
  const { title, count, icon: Icon } = props;
  return (
    <div className=" grid grid-cols-[auto_1fr] gap-3 py-5 px-3 rounded-sm shadow-lg items-center">
      <Icon className=" text-4xl text-blue-500" />
      <div>
        <h2 className=" font-medium text-xl">{title}</h2>
        <p className=" font-semibold text-2xl">{count}</p>
      </div>
    </div>
  );
}

export default TransactionStatCard;
