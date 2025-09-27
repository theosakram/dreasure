import { Transaction } from "../transactions/transactionTypes";

export type User = {
  id: string;
  fullname: string;
  email: string;
  position: string;
};

export type UserWithTransactions = User & {
  transactions: Array<Transaction>;
};

export type UserTransactionSummary = User & {
  deposit_count: number;
  deposit_total: number;
  withdraw_count: number;
  withdraw_total: number;
  balance: number;
};
