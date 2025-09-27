import { User } from "../users/userTypes";

export type Transaction = {
  id: number;
  user_id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  description: string;
  created_at: string;
  user: User;
};
