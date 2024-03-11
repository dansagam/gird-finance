import { UseFormReturn } from "react-hook-form";
import { transferDefaultValues } from "../validations";
import ControlledCombineInput from "@/shared/input/ControlledCombineInput";
import { useGetCurrencies, useGetExchangeRate } from "@/hooks/queries/useCurrencies";
import BankMethon from "@/assets/bank_method.svg";
import { MdOutlineRssFeed } from "react-icons/md";
import { ImFeed } from "react-icons/im";
import { TbBrandFeedly } from "react-icons/tb";
import React from "react";
import useDebounce from "@/hooks/useDebounce";
import ControlledSelect from "@/shared/select/ControlledSelect";
const CurrencyIcon = {
  USD: "https://flagcdn.com/16x12/us.png",
  EUR: "https://flagcdn.com/16x12/eu.png",
  GBP: "https://flagcdn.com/16x12/gb.png",
};
const CurrencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};
type TransferFormProps = {
  form: UseFormReturn<typeof transferDefaultValues>;
};
function TransferForm(props: TransferFormProps) {
  const { form } = props;
  const { sendCurrency, receiverCurrency } = form.watch();
  const { currencies } = useGetCurrencies({ params: { currencies: "USD,GBP,EUR" } });
  const [knowBase, setKnownBase] = React.useState({
    receieved: "",
    sent: "",
    change: transferDefaultValues.sendCurrency,
  });
  const sendAmount = form.watch("sendAmount") || 1;
  // const receiverAmount = form.watch("receiverAmount") || 1;
  const exchangeCurrencies = sendCurrency + "," + receiverCurrency;
  const deterChanged = useDebounce(sendCurrency + "," + receiverCurrency + "," + knowBase.change, 500);
  const { exchangeRate } = useGetExchangeRate({
    params: {
      base_currency: sendCurrency,
      currencies: exchangeCurrencies,
      change: deterChanged,
    },
  });
  // const returnKeys = Object.keys(exchangeRate|| {})

  const exchangeSentRate = exchangeRate ? exchangeRate[sendCurrency] || 1 : 1; // assumes this is the base currency
  const exchangeReceivedRate = exchangeRate ? exchangeRate[receiverCurrency] || 1 : 1;
  const updateSentAmount = exchangeSentRate;
  const updateReceivedAmount = exchangeReceivedRate * sendAmount;

  React.useEffect(() => {
    if (sendCurrency && receiverCurrency) {
      setKnownBase((prev) => ({
        ...prev,
        change: prev.receieved === receiverCurrency ? sendCurrency : receiverCurrency,
        receieved: receiverCurrency,
        sent: sendCurrency,
      }));
    }
  }, [sendCurrency, receiverCurrency]);

  React.useEffect(() => {
    if (exchangeRate) {
      form.setValue("sendAmount", updateSentAmount || 0);
      form.setValue("receiverAmount", updateReceivedAmount || 0);
    }
  }, [exchangeRate]);

  React.useEffect(() => {
    if (updateSentAmount) {
      form.setValue("receiverAmount", updateReceivedAmount || 0);
    }
  }, [sendAmount]);

  return (
    <div className=" grid gap-4">
      <div>
        <ControlledCombineInput
          control={form.control}
          nameArray={["sendAmount", "sendCurrency"]}
          label="You Send"
          options={currencies.map((el) => ({
            label: el.name_plural,
            value: el.code,
            sub: el.code,
            // @ts-ignore
            icon: CurrencyIcon[el.code],
          }))}
          // @ts-ignore
          prefix={CurrencySymbols[sendCurrency as keyof typeof sendCurrency] || ""}
          renderText={(values) => <span>{values} 6666</span>}
        />
        <div className=" relative py-[13px] px-[24px] before:absolute before:content-[''] before:w-[1px] before:h-full before:bg-[#f4d09f] before:top-0 before:left-6">
          {feeStats({
            base_sub: sendCurrency,
            received_sub: receiverCurrency,
            fee: 0,
            totalPay: sendAmount,
            rate: exchangeReceivedRate,
          }).map((field, key) => (
            <CustomDropper key={key} {...field} />
          ))}
        </div>
      </div>
      <ControlledCombineInput
        control={form.control}
        nameArray={["receiverAmount", "receiverCurrency"]}
        options={currencies.map((el) => ({
          label: el.name_plural,
          value: el.code,
          sub: el.code,
          // @ts-ignore
          icon: CurrencyIcon[el.code],
        }))}
        label="Receiver Gets"
        // @ts-ignore
        prefix={CurrencySymbols[receiverCurrency as keyof typeof receiverCurrency] || ""}
      />
      <CustomDeliverySelect
        control={form.control}
        name="deliveryMethod"
        options={[
          {
            label: "",
            value: "A",
          },
        ]}
      />
    </div>
  );
}

export default TransferForm;

type feeStatsProps = {
  totalPay: number;
  fee: number;
  rate: number;
  base_sub: string;
  received_sub: string;
};

type FeeStats = {
  icon: JSX.Element;
  title: string;
  amount: string;
  sub: string;
};

const feeStats = (values?: Partial<feeStatsProps>): FeeStats[] => [
  {
    icon: <MdOutlineRssFeed />,
    title: "Fee",
    amount: `${values?.fee || 0} ${values?.base_sub || ""}`,
    sub: "",
  },
  {
    icon: <ImFeed />,
    title: "Total to pay",
    amount: `${values?.totalPay || 0} ${values?.base_sub || ""}`,
    sub: "",
  },
  {
    icon: <TbBrandFeedly />,
    title: "Rate + Bonus",
    amount: `1 ${values?.base_sub || ""} = ${values?.rate?.toFixed(3) || 0} ${values?.received_sub || " "}`,
    sub: "",
  },
];

const CustomDropper = (props: FeeStats) => {
  return (
    <li className=" flex justify-between items-center gap-2 py-1 px-2  text-sm">
      <span className=" flex gap-1 items-start">
        <span className="rounded-full bg-[#b7ce53] p-1">{props.icon}</span>
        <span className=" text-base">{props.title}</span>
      </span>
      <span>{props.amount}</span>
    </li>
  );
};

type Props = React.ComponentProps<typeof ControlledSelect<typeof transferDefaultValues>>;

const CustomDeliverySelect = (props: Props) => {
  const { control, options, label, ...rest } = props;

  const transformOptions = options.map((opt) => {
    const label = (
      <div className=" flex justify-start gap-2">
        <div>
          <h3 className=" text-sm">Send to a Bank Account</h3>
          <p className=" text-gray-400 text-xs">Transfer within 2 days</p>
        </div>
      </div>
    );
    return {
      label,
      // icon: "https://send.flutterwave.com/images/icons/delivery-method/bank.svg",
      icon: BankMethon,
      value: opt.value,
      sub: opt?.sub,
    };
  });

  return (
    <div>
      <p>{label}</p>

      <ControlledSelect<typeof transferDefaultValues>
        control={control}
        isSearch={false}
        options={transformOptions}
        classess={{
          button: " bg-white rounded-md py-4 px-3",
        }}
        {...rest}
      />
    </div>
  );
};
