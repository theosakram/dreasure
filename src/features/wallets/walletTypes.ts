import { Transaction } from "../transactions/transactionTypes";

export type Wallet = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export type WalletWithTransactions = Wallet & {
  transactions: Array<Transaction>;
};

export type GetWalletsResponse = Array<
  Wallet & {
    transactions: Array<Transaction>;
  }
>;
