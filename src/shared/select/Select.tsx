import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { OptionType, Prettify } from "@/@types/baseInterface";
import { LuChevronDown } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import SearchInput from "../input/SearchInput";
import { isString } from "@/utils/isString";

type ModifiedOptionType = Prettify<
  Omit<OptionType, "label"> & { icon?: string; sub?: React.ReactNode; label: React.ReactNode | string }
>;
type SelectProps = Prettify<{
  options: ModifiedOptionType[];
  value?: string;
  onChange?: (_val: string) => void;
  label?: string;
  showIcon?: boolean;
  valueAsDisplay?: boolean;
  isSearch?: boolean;
  classess?: {
    button?: string;
    panel?: string;
  };
}>;
function Select(props: SelectProps) {
  const { options, onChange, value = "", showIcon = true, valueAsDisplay, isSearch = true, classess } = props;
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
            <Popover.Button
              className={twMerge(
                " rounded-[100px] flex  justify-between items-center w-full min-w-24 outline-none p-2 bg-[#f2f2f2]",
                classess?.button
              )}
            >
              <span className=" flex items-center gap-2">
                {selectedValue?.icon && showIcon && <img src={selectedValue.icon} alt={selectedValue.icon} />}
                <span className=" text-black font-semibold">
                  {valueAsDisplay ? selectedValue?.value || "" : selectedValue.label || ""}
                </span>
              </span>
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
              <Popover.Panel
                className={twMerge(
                  "absolute z-10 bg-white rounded-[2rem] right-0 px-3 py-3 shadow-lg min-w-[25rem] outline-none w-full ",
                  classess?.panel
                )}
              >
                <div>
                  {isSearch && (
                    <SearchInput placeholder=" Search for currency..." onChange={(e) => setText(e.target.value)} />
                  )}
                  {options
                    .filter((el) => isString(el.label) && el.label.match(reqText))
                    .map((el, idx) => (
                      <li
                        key={idx}
                        className={twMerge(
                          "flex relative justify-between gap-2 px-5 py-6 transition-all duration-500 items-center",
                          "after:content-[''] h-0 after:absolute after:right-0 after:w-1 after:transition-all after:duration-500 after:hover:h-full after:bg-gray-300 whitespace-nowrap cursor-pointer "
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
                          <img src={selectedValue.icon} alt={el.icon} />
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
