import React from "react";
import { FieldValues, Controller } from "react-hook-form";
import CurrencyInput from "./CurrencyInput";
import { BaseControlledParameter, Prettify } from "@/@types/baseInterface";

type OmitCurrencyInputProp = Prettify<
  Omit<React.ComponentProps<typeof CurrencyInput>, "name" | "error" | "value" | "onBlur"> & {
    /**
     * @param {subText} shoud be "currency" or "decimal" or "integer"
     */
    subText?: string;
  }
>;
export interface ControlledCurrencyInputProps<TFieldValues extends FieldValues>
  extends OmitCurrencyInputProp,
    BaseControlledParameter<TFieldValues> {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
}

function ControlledCurrencyInput<TFieldValues extends FieldValues>(props: ControlledCurrencyInputProps<TFieldValues>) {
  const { control, rules, name: cname, label, ...rest } = props;
  return (
    <Controller
      control={control}
      rules={rules}
      name={cname}
      // eslint-disable-next-line no-unused-vars
      render={({ field: { ref, onChange, value, ...fields } }) => (
        <CurrencyInput
          label={label}
          onValueChange={(val) => onChange(val.floatValue)}
          value={value}
          {...rest}
          {...fields}
        />
      )}
    />
  );
}

export default ControlledCurrencyInput;
