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
