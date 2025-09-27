import { Transaction } from "../transactions/transactionTypes";

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
};

export type ProfileWithTransactions = Profile & {
  transactions: Array<Transaction>;
};
