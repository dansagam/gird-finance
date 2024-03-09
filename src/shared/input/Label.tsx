import React from "react";
import { InputFormProps } from "./Input";
import { Prettify } from "@/@types/baseInterface";
import { twMerge } from "tailwind-merge";

type LabelProps = Prettify<React.LabelHTMLAttributes<HTMLLabelElement> & InputFormProps>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { children, htmlFor, "data-app-error": appErr, className, ...rest },
  ref
) {
  return (
    <label
      ref={ref}
      data-app-error={Boolean(appErr)}
      htmlFor={htmlFor}
      className={twMerge(
        "z-[1] block overflow-hidden origin-top-left bg-transparent whitespace-nowrap overflow-ellipsis max-w-full data-[app-error=true]:!text-error-100",
        ""
      )}
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
