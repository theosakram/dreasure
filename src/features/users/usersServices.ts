import { supabaseClient } from "@/supabase/client";
import { User, UserTransactionSummary } from "./userTypes";

export const getUsers = async () => {
  const supabase = supabaseClient();
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .overrideTypes<Array<User>>();

  return users;
};

export const getUserTransactionsSummary = async () => {
  const supabase = supabaseClient();
  const { data: users } = await supabase
    .from("user_transaction_summary")
    .select("*")
    .overrideTypes<Array<UserTransactionSummary>>();

  return users;
};
