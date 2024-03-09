import React from "react";
import { Prettify } from "@/@types/baseInterface";
import { twMerge } from "tailwind-merge";
import Label from "./Label";

export interface InputFormProps {
  label?: string | React.ReactNode;
  select?: boolean;
  error?: boolean;
}
type InputBaseProps = Prettify<React.InputHTMLAttributes<HTMLInputElement> & InputFormProps>;

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  ({ className, error, type, placeholder, "data-app-error": appError, ...rest }, ref) => {
    return (
      <input
        aria-label={"sensor"}
        data-app-error={Boolean(appError || error)}
        className={twMerge(
          "rounded-md bg-transparent border placeholder:text-[#0B2253]",
          "placeholder:text-slate-400",
          "data-[app-error=true]:border data-[app-error=true]:border-error-100",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 disabled:border-gray-300",
          "focus:!outline-none focus:!border-[#0A74DC] focus:!border-3 focus:!ring-offset-2",
          className
        )}
        ref={ref}
        placeholder={placeholder || ""}
        type={type || "text"}
        {...rest}
      />
    );
  }
);

InputBase.displayName = "InputBase";

export type FormMicsProps = {
  helperText?: string | React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};
type InputProps = Prettify<
  React.ComponentProps<typeof InputBase> & {
    FormLabelProps?: React.ComponentProps<typeof Label>;
  } & FormMicsProps
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function (
  {
    size = "medium",
    label,
    error,
    className,
    FormLabelProps,
    helperText,
    id,
    value,
    startAdornment,
    endAdornment,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = React.useState(false);
  const inputLabelId = label && id ? `${id}-label` : undefined;
  return (
    <div className="relative py-3 w-full">
      <Label
        htmlFor={inputLabelId}
        autoFocus
        {...(FormLabelProps || {})}
        data-app-active={Boolean(value)}
        data-app-error={Boolean(error)}
        className={twMerge(
          "transition-all  duration-700 ease-out origin-[0_0] ",
          "pointer-events-none text-center mb-0 max-w-[90%]",
          "peer-focus:bg-white peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.75] peer-focus:text-text-main",
          // focused ? "bg-neutral-white -translate-y-[1.4rem] scale-[0.75] text-text-main": "",
          " data-[app-active=true]:-translate-y-[1.4rem] data-[app-active=true]:scale-[0.78] data-[app-active=true]:bg-white",
          "data-[app-error=true]:!text-error-100",
          " disabled:text-neutral-greyText",
          FormLabelProps?.className
        )}
        error={error}
      >
        {label}
      </Label>
      <div
        data-app-error={Boolean(error)}
        className={twMerge(
          "relative w-full py-1 flex items-center  rounded px-1  ",
          focused && "border-[2px] border-[#0A74DC] ",
          " data-[app-error=true]:text-error-100 data-[app-error=true]:border data-[app-error=true]:border-error-100"
        )}
      >
        {startAdornment && <div className=" flex justify-start items-center flex-wrap">{startAdornment}</div>}
        <InputBase
          ref={ref}
          id={inputLabelId}
          data-app-error={Boolean(error)}
          data-app-active={Boolean(value)}
          value={value}
          className={twMerge(
            "bg-none w-full border rounded-[4px] text-2xl font-medium text-[#bdbdbd] ",
            "peer border-none outline-none transition-all duration-200 ease-linear focus-within:bg-transparent ",
            " data-[app-active=true]:text-black",
            className
          )}
          error={error}
          onFocus={(e) => {
            setFocused(true);
            if (rest.onFocus) {
              rest.onFocus(e);
            }
          }}
          onBlurCapture={(e) => {
            setFocused(false);
            if (rest.onBlurCapture) {
              rest.onBlurCapture(e);
            }
          }}
          {...rest}
        />
        {endAdornment && <span className=" flex justify-start flex-wrap items-center">{endAdornment}</span>}
      </div>
    </div>
  );
});

Input.defaultProps = {
  type: "text",
  label: "",
};

export default Input;
