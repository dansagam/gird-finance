import { Prettify } from "@/@types/baseInterface";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Input from "./Input";
import React from "react";

type CurrencyInputProps = Prettify<NumericFormatProps & React.ComponentProps<typeof Input>>;

function CurrencyInput(props: CurrencyInputProps) {
  const { value, thousandSeparator, prefix, ...rest } = props;
  console.log({ value });
  return (
    <div>
      <NumericFormat
        value={value}
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        min={0}
        customInput={Input}
        {...rest}
      />
    </div>
  );
}

export default CurrencyInput;
