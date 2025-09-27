import { supabaseClient } from "@/supabase/client";
import {
  User,
  UserTransactionSummary,
  UserWithTransactions,
} from "./userTypes";

export const getUsers = async () => {
  const supabase = supabaseClient();
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .overrideTypes<Array<User>>();

  return users;
};

export const getUserById = async (id: string) => {
  const supabase = supabaseClient();
  const { data: users } = await supabase
    .from("users")
    .select(`*, transactions(*)`)
    .eq("id", id)
    .single<UserWithTransactions>();

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

export const getUserTransactionsSummaryById = async (id: string) => {
  const supabase = supabaseClient();
  const { data: users } = await supabase
    .from("user_transaction_summary")
    .select("*")
    .eq("user_id", id)
    .overrideTypes<Array<UserTransactionSummary>>();

  return users;
};
