import TransferForm from "@/modules/home/components/TransferForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { transferDefaultValues, transferResolver } from "@/modules/home/validations";
import HomeLayout from "@/layout/home-layout";
import { usePaystackPayment } from "react-paystack";
import { BASE_ENV } from "@/api/envFile";

function Transfer() {
  const form = useForm({
    defaultValues: transferDefaultValues,
    resolver: transferResolver,
  });
  const receiverAmount = form.watch("receiverAmount");
  console.log({ receiverAmount });
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: Math.floor(receiverAmount || 0), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: BASE_ENV.paystackKey,
  };
  const initializePayment = usePaystackPayment(config);
  const onSubmit: SubmitHandler<typeof transferDefaultValues> = () => {
    initializePayment({
      onSuccess(values) {
        console.log({ values });
      },
      onClose(values) {
        console.log({ values });
      },
    });
  };
  return (
    <HomeLayout onAction={form.handleSubmit(onSubmit)}>
      <TransferForm form={form} />
    </HomeLayout>
  );
}

export default Transfer;
