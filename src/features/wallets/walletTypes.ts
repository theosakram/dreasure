import { Transaction } from "../transactions/transactionTypes";

export type WalletTypes = "transaction" | "installment";

export type Wallet = {
  id: string;
  name: string;
  description: string;
  type: WalletTypes;
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
