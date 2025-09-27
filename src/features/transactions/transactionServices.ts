import { supabaseClient } from "@/supabase/client";
import { Transaction } from "./transactionTypes";

export const getTransactions = async () => {
  const supabase = supabaseClient();
  const { data: transactions } = await supabase
    .from("transactions")
    .select(
      `
    *,
    user:users(id,fullname,email, position)
  `,
    )
    .overrideTypes<Array<Transaction>>();

  return transactions;
};

export const addTransaction = async (payload: {
  user_id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  description?: string;
}) => {
  const supabase = supabaseClient();

  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
