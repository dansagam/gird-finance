import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { ISvgIcon, OptionType, Prettify } from "@/@types/baseInterface";
import { LuChevronDown } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type ModifiedOptionType = Prettify<OptionType & { icon?: ISvgIcon; sub?: React.ReactNode }>;
type SelectProps = Prettify<{
  options: ModifiedOptionType[];
  value?: string;
  onChange?: (_val: string) => void;
  label?: string;
  showIcon?: boolean;
}>;
function Select(props: SelectProps) {
  const { options, onChange, value = "", showIcon } = props;
  const objValue = options.reduce(
    (prev, curr) => ({ ...prev, [curr.value]: curr }),
    {} as Record<string, ModifiedOptionType>
  );
  const selectedValue = objValue?.[value];
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <React.Fragment>
          <Popover.Button>
            {selectedValue?.icon && showIcon && <selectedValue.icon />}

            {selectedValue?.value || ""}

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
            <Popover.Panel className="absolute z-10 bg-white rounded-[2rem]">
              <div>
                {options.map((el) => (
                  <li
                    className={twMerge(
                      "flex relative justify-between gap-2 px-5 py-6 transition-all duration-200 ",
                      "after:content-[''] h-0 after:absolute after:w-1 hover:after:h-full after:bg-gray-300 "
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
                      {el.icon && <el.icon />}
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
  );
}

export default Select;
