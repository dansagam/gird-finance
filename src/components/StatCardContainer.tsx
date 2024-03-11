import React from "react";
import { twMerge } from "tailwind-merge";
import { IChildren } from "@/@types/baseInterface";

function StatCardContainer({ children, idx: dx }: IChildren & { idx?: number }) {
  return (
    <div className="grid ">
      <div className=" overflow-x-auto min-w-full flex snap-x py-2 px-1 gap-4 md:hide-scrollbar">
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={twMerge(" flex-1 max-md:w-max min-w-[300px]", idx === dx && " md:min-w-[300px] flex-grow-0")}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatCardContainer;
