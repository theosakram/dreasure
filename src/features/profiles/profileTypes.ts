import { Transaction } from "../transactions/transactionTypes";
import { InstallmentWithPayments } from "../installments/installmentTypes";

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
};

export type ProfileWithTransactions = Profile & {
  transactions: Array<Transaction>;
  installments?: Array<InstallmentWithPayments>;
};
