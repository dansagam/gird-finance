import React from "react";
import { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "./Select";
import { BaseControlledParameter } from "@/@types/baseInterface";

type OmitSelectProp = Omit<React.ComponentProps<typeof Select>, "name" | "error" | "value" | "onBlur"> & {
  /**
   * @param {subText} shoud be "currency" or "decimal" or "integer"
   */
  subText?: string;
};
export interface ControlledSelectProps<TFieldValues extends FieldValues>
  extends OmitSelectProp,
    BaseControlledParameter<TFieldValues> {
  ref?: React.MutableRefObject<HTMLInputElement | null>;
}

function ControlledSelect<TFieldValues extends FieldValues>(props: ControlledSelectProps<TFieldValues>) {
  const { control, rules, name: cname, label, options, ...rest } = props;
  return (
    <Controller
      control={control}
      rules={rules}
      name={cname}
      // eslint-disable-next-line no-unused-vars
      render={({ field: { ref, onChange, value, ...fields } }) => (
        <Select label={label} onChange={onChange} options={options} value={value} {...rest} {...fields} />
      )}
    />
  );
}

export default ControlledSelect;
