import React from "react";
import { Transition, Dialog as UDialog } from "@headlessui/react";
import { IChildren, ISvgIcon, Prettify } from "@/@types/baseInterface";
import { ImCancelCircle } from "react-icons/im";
import { twMerge } from "tailwind-merge";
import errorLogo from "@/assets/img/error-gif.gif";
import successlogo from "@/assets/img/successAnimation.gif";
import { LuLoader } from "react-icons/lu";

type DialogProps = Prettify<
  {
    open: boolean;
    onClose(): void;
    onAction?: () => void;
    onSecAction?: () => void;
    title?: string;
    description?: string;
    actionText?: string;
    secActionText?: string;
    ActionButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    SecActionButton?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    loading?: boolean;
    disabled?: boolean;
    maxWidth?: string;
    content?: string;
    showIcon?: boolean;
    isError?: boolean;
    Icon?: ISvgIcon;
  } & IChildren
>;

const Dialog = (props: DialogProps) => {
  const {
    open,
    onClose,
    onAction,
    onSecAction,
    children,
    actionText,
    description,
    secActionText,
    title,
    ActionButton,
    SecActionButton,
    disabled,
    loading,
    maxWidth,
    content,
    isError,
    showIcon,
    Icon,
  } = props;
  const renderIcon = () => {
    if (loading) {
      return <LuLoader className="animate-spin duration-500" size={45} />;
    }
    if (isError) {
      return <img src={errorLogo} alt="" width={70} height={70} />;
    }
    if (Icon) {
      return <Icon style={{ fontSize: 90 }} className="animate-bounce " />;
    }

    return <img src={successlogo} alt="" width={70} height={70} />;
  };
  return (
    <Transition appear show={open} as={React.Fragment}>
      <UDialog as="div" className="relative z-[350]" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <UDialog.Panel
                className={twMerge(
                  "w-full transform overflow-auto relative transition-all rounded-lg shadow-xl bg-white",
                  maxWidth || "max-w-md"
                )}
              >
                <div className=" flex justify-between items-center py-3 px-6 border-b sticky top-0">
                  <UDialog.Title className=" flex-1">{title || ""}</UDialog.Title>

                  <button>
                    <ImCancelCircle />
                  </button>
                </div>
                <UDialog.Description as="div" className="p-6">
                  <div
                    data-app-active={!!showIcon}
                    className="hidden data-[app-active=true]:flex justify-center items-center gap-2"
                  >
                    {renderIcon()}
                  </div>
                  <h2 data-app-active={!!content} className=" hidden data-[app-active=true]:block">
                    {content}
                  </h2>
                  {description && <p className=" text-neutral-bodyText text-sm my-2">{description}</p>}
                  <div>{children}</div>
                </UDialog.Description>
                <div className="sticky bottom-0">
                  <div className="flex justify-center gap-4 items-center py-4 px-6">
                    <button
                      data-app-error={!!isError}
                      className=" bg-primary-light py-3 px-3 rounded-md w-full data-[app-error=true]:bg-red-600 data-[app-error=true]:text-red-200 "
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSecAction) {
                          onSecAction();
                        } else {
                          onClose();
                        }
                      }}
                      disabled={disabled || loading}
                      {...SecActionButton}
                    >
                      {secActionText || "Cancel"}
                    </button>
                    {actionText && (
                      <button
                        {...ActionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAction) {
                            onAction();
                          }
                        }}
                        disabled={disabled || loading}
                      >
                        {actionText}
                      </button>
                    )}
                  </div>
                </div>
              </UDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </UDialog>
    </Transition>
  );
};

export default Dialog;
