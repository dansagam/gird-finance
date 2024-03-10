import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const transferValidationSchema = yup.object({
  sendAmount: yup.number().required("Amount cannot be be empty").min(1),
  sendCurrency: yup.string().required("Currency cannot be empty"),
  receiverAmount: yup.number().required("Amount cannot be be empty").min(1),
  receiverCurrency: yup.string().required("Currency cannot be empty"),
  deliveryMethod: yup.string().nullable("Delivery methode cannot").optional(),
});

type TransferValidationType = yup.InferType<typeof transferValidationSchema>;

export const transferDefaultValues: TransferValidationType = {
  sendAmount: 0,
  sendCurrency: "GBP",
  receiverAmount: 0,
  receiverCurrency: "USD",
  deliveryMethod: "A",
};

export const transferResolver = yupResolver(transferValidationSchema);
