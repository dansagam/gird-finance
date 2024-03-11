import { Prettify } from "@/@types/baseInterface";
import Dialog from "@/shared/modal/Dialog";
import React from "react";

type Props = Prettify<Pick<React.ComponentProps<typeof Dialog>, "open" | "onClose" | "isError">>;

function SuccessModal(props: Props) {
  const { onClose, open, isError } = props;
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      isError={isError}
      showIcon
      description={isError ? "Error occurred" : "Transferred successfully"}
    >
      <p data-app-error={Boolean(isError)} className=" text-2xl text-green-800 data-[app-error=true]:text-red-600">
        {isError ? "Error occurred" : "Transferred successfully"}
      </p>
    </Dialog>
  );
}

export default SuccessModal;
