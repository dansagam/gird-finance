import React from "react";
import { IoIosSearch } from "react-icons/io";
import { InputBase } from "./Input";
import { twMerge } from "tailwind-merge";

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof InputBase>>(
  ({ className, ...rest }, ref) => {
    return (
      <div className=" flex items-center">
        <IoIosSearch className=" text-2xl" />
        <InputBase
          type="search"
          className={twMerge(" p-3 outline-none border-none placeholder:text-sm w-full", className)}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default SearchInput;
