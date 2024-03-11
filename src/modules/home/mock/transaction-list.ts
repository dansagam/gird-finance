import { subDays, subMonths, subYears } from "date-fns";

export type TransactionLIstType = {
  status: string;
  amount: number;
  sender: string;
  destination: string;
  destinationBank: string;
  account: string;
  transactionID: string;
  transactionDate: Date;
};

export const transactionsList: TransactionLIstType[] = [
  {
    account: "09901381201",
    amount: 7000,
    sender: "Abijo Best",
    destination: "09901381201",
    destinationBank: "Afri Peo Bank",
    status: "active",
    transactionDate: new Date(),
    transactionID: "HDJSJ_8382939Hhdjab",
  },
  {
    account: "09901381201",
    amount: 10000,
    sender: "John Best",
    destination: "09901381201",
    destinationBank: "Afri Peo Bank",
    status: "active",
    transactionDate: subMonths(new Date(), 2),
    transactionID: "HDJSJ_8382939Hhdjab",
  },
  {
    account: "09901381201",
    amount: 500000,
    sender: "Abraham Best",
    destination: "09901381201",
    destinationBank: "Afri Peo Bank",
    status: "active",
    transactionDate: subDays(new Date(), 20),
    transactionID: "HDJSJ_8382939Hhdjab",
  },
  {
    account: "09901381201",
    amount: 300000,
    sender: "ANothre Best",
    destination: "09901381201",
    destinationBank: "Afri Peo Bank",
    status: "active",
    transactionDate: subYears(new Date(), 3),
    transactionID: "HDJSJ_8382939Hhdjab",
  },
];
