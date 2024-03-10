import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { OptionType, Prettify } from "@/@types/baseInterface";
import { LuChevronDown } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import SearchInput from "../input/SearchInput";

const CurrencyIcon = {
  USD: "https://flagcdn.com/16x12/us.png",
  EUR: "https://flagcdn.com/16x12/eu.png",
  GBP: "https://flagcdn.com/16x12/gb.png",
};
type ModifiedOptionType = Prettify<OptionType & { icon?: string; sub?: React.ReactNode }>;
type SelectProps = Prettify<{
  options: ModifiedOptionType[];
  value?: string;
  onChange?: (_val: string) => void;
  label?: string;
  showIcon?: boolean;
}>;
function Select(props: SelectProps) {
  const { options, onChange, value = "", showIcon = true } = props;
  console.log(options);
  const [text, setText] = React.useState("");
  const escapedText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const reqText = new RegExp(`${escapedText}`, "i");
  const objValue = options.reduce(
    (prev, curr) => ({ ...prev, [curr.value]: curr }),
    {} as Record<string, ModifiedOptionType>
  );
  const selectedValue = objValue?.[value];
  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <React.Fragment>
            <Popover.Button className=" rounded-[100px] flex  justify-between items-center min-w-24 outline-none p-2 bg-[#f2f2f2]">
              {selectedValue?.icon && showIcon && (
                <img
                  src={
                    // @ts-ignore
                    CurrencyIcon[selectedValue.icon || "EUR"]
                  }
                  alt={selectedValue.icon}
                />
              )}
              <span className=" text-black font-semibold">{selectedValue?.value || ""}</span>
              <LuChevronDown data-app-active={open} />
            </Popover.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 bg-white rounded-[2rem] right-0 px-3 py-3 shadow-lg min-w-[25rem] outline-none w-full ">
                <div>
                  <SearchInput placeholder=" Search for currency..." onChange={(e) => setText(e.target.value)} />
                  {options
                    .filter((el) => el.label.match(reqText))
                    .map((el, idx) => (
                      <li
                        key={idx}
                        className={twMerge(
                          "flex relative justify-between gap-2 px-5 py-6 transition-all duration-200 items-center",
                          "after:content-[''] h-0 after:absolute after:w-1 hover:after:h-full after:bg-gray-300 whitespace-nowrap "
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onChange) {
                            onChange(el.value);
                          }
                          close();
                        }}
                      >
                        <span className=" flex items-center justify-start gap-2">
                          <img
                            src={
                              // @ts-ignore
                              CurrencyIcon[el.icon || "EUR"]
                            }
                            alt={el.icon}
                          />
                          <span>{el.label}</span>
                        </span>
                        {el.sub && <span>{el.sub}</span>}
                      </li>
                    ))}
                </div>
              </Popover.Panel>
            </Transition>
          </React.Fragment>
        )}
      </Popover>
    </div>
  );
}

export default Select;
