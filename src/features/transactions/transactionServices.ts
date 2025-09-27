import { supabaseClient } from "@/supabase/client";
import { AddTransactionRequest, Transaction } from "./transactionTypes";

type GetTransactionPayload = {
  gte?: string;
  lte?: string;
  name?: string;
};

export async function getTransactions(payload?: GetTransactionPayload) {
  let query = supabaseClient()
    .from("transactions")
    .select(
      `
      *,
      userProfile:profiles!inner (
        id,
        fullname,
        email
      )
      `,
    )
    .order("created_at", { ascending: false });

  if (payload?.gte) query = query.gte("created_at", payload.gte);
  if (payload?.lte) query = query.lte("created_at", payload.lte);
  if (payload?.name)
    query = query.ilike("userProfile.fullname", `%${payload.name}%`);

  const { data, error } = await query.overrideTypes<Transaction[]>();

  if (error) throw error;
  return data ?? [];
}

export const addTransaction = async (payload: AddTransactionRequest) => {
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
