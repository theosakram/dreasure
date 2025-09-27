import { Profile } from "../profiles/profileTypes";

export type TransactionType = "deposit" | "withdraw";

export type Transaction = {
  id: number;
  wallet_id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  created_at: string;
  userProfile: Profile;
};

export type AddTransactionRequest = {
  wallet_id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
  description?: string;
};
