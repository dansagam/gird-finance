import TransferForm from "@/modules/home/components/TransferForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { transferDefaultValues, transferResolver } from "@/modules/home/validations";
import HomeLayout from "@/layout/home-layout";
import { usePaystackPayment } from "react-paystack";
import { BASE_ENV } from "@/api/envFile";
import AppErrorBoundary from "@/shared/error/ErrorBoundary";
import React from "react";
import SuccessModal from "@/modules/home/components/SuccessModal";

function Transfer() {
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const form = useForm({
    defaultValues: transferDefaultValues,
    resolver: transferResolver,
  });
  const receiverAmount = form.watch("receiverAmount");
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: Math.floor(receiverAmount || 0), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: BASE_ENV.paystackKey,
  };
  const initializePayment = usePaystackPayment(config);
  const onSubmit: SubmitHandler<typeof transferDefaultValues> = () => {
    initializePayment({
      onSuccess() {
        setOpen(true);
      },
      onClose() {
        setOpen(true);
        setErr(true);
      },
    });
  };
  return (
    <HomeLayout onAction={form.handleSubmit(onSubmit)}>
      <AppErrorBoundary>
        {" "}
        {/** this is isolate the page when it fails and crash */}
        <TransferForm form={form} />
      </AppErrorBoundary>
      <SuccessModal
        open={open}
        onClose={() => {
          setOpen(false);
          setErr(false);
        }}
        isError={!!err}
      />
    </HomeLayout>
  );
}

export default Transfer;
