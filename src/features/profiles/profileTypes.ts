import { TransactionWithWallet } from "../transactions/transactionTypes";
import { InstallmentWithPayments } from "../installments/installmentTypes";

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
};

export type ProfileWithTransactions = Profile & {
  transactions: Array<TransactionWithWallet>;
  installments?: Array<InstallmentWithPayments>;
};

export type CreateProfileRequest = {
  fullname: string;
};
