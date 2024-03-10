import { BaseControlledParameter, Prettify } from "@/@types/baseInterface";
import { FieldValues, Path } from "react-hook-form";
import ControlledCurrencyInput from "./ControlledCurrencyInput";
import ControlledSelect from "../select/ControlledSelect";
import Select from "../select/Select";
import CurrencyInput from "./CurrencyInput";

type ControlledCombineInputProps<TFieldValues extends FieldValues> = Prettify<
  Omit<BaseControlledParameter<TFieldValues>, "name"> & {
    nameArray: [Path<TFieldValues>, Path<TFieldValues>];
    options: React.ComponentProps<typeof Select>["options"];
    label?: string;
    prefix?: string;
  } & Pick<React.ComponentProps<typeof CurrencyInput>, "renderText">
>;

function ControlledCombineInput<TFieldValues extends FieldValues>(props: ControlledCombineInputProps<TFieldValues>) {
  const { control, nameArray, errors, rules, options, label, prefix, ...rest } = props;
  return (
    <div className=" relative bg-white rounded-xl flex items-center justify-between gap-2 p-4">
      <ControlledCurrencyInput
        control={control}
        {...rest}
        name={nameArray[0]}
        errors={errors}
        label={label}
        thousandSeparator=","
        rules={rules}
        className=" flex-1"
        prefix={prefix}
      />
      <ControlledSelect
        control={control}
        name={nameArray[1]}
        options={options}
        errors={errors}
        label={label}
        rules={rules}
        valueAsDisplay
      />
    </div>
  );
}

export default ControlledCombineInput;
