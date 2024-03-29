import { IChildren, Prettify } from "@/@types/baseInterface";
import StandIcon from "@/assets/stand_pag.svg?react";
import url from "@/assets/stand_pag.svg";
import { LuInfo } from "react-icons/lu";

type HomeLayoutProps = Prettify<
  {
    onAction(): void;
    warnText?: string;
    actionText?: string;
  } & IChildren
>;
const HomeLayout = ({ children, onAction, actionText }: HomeLayoutProps) => {
  return (
    <div className="  w-full h-full ">
      <div className=" grid md:grid-cols-2 gap-3 grid-cols-1  h-full">
        <div className="  hidden md:flex" style={{ backgroundImage: url }}>
          <StandIcon className=" edge-image-float" />
        </div>
        <div className="my-auto ">
          <div className="grid min-h-[45rem] min-w-[20rem] px-7 max-w-[38rem] md:mx-auto">
            <div className=" shadow-[0px_6px_20px_5px_rgba(0,0,0,0.25)] p-[2rem_1.2rem_1rem] md:p-[5rem_4.2rem_2rem] rounded-[2rem] ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onAction();
                }}
                className=" grid grid-rows-[1fr_auto_auto_auto] gap-5 h-full"
              >
                <div>{children}</div>
                <div className=" bg-primary-light p-3 grid grid-cols-[auto_1fr] gap-2 items-center rounded-xl">
                  <LuInfo />
                  <p className=" text-xs text-[#273875]">
                    Your recipient will get a receiver bonus on all your transfers to Nigeria. Total includes official
                    rate and receiver bonus.
                  </p>
                </div>
                <button type="submit" className=" bg-primary-main text-base p-5 rounded-[2rem] font-light text-white">
                  {actionText || "Send Money"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
