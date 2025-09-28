import { supabaseClient } from "@/supabase/client";
import { AddTransactionRequest, Transaction } from "./transactionTypes";
import { WalletName } from "../wallets/walletTypes";

type GetTransactionPayload = {
  gte?: string;
  lte?: string;
  name?: string;
  walletName: WalletName;
};

export async function getWalletTransactions(payload?: GetTransactionPayload) {
  let query = supabaseClient()
    .from("transactions")
    .select(
      `
      *,
      userProfile:profiles!inner (
        id,
        fullname,
        email
      ),
      wallet:wallets!inner (
        id,
        name
      )
      `,
    )
    .order("created_at", { ascending: false })
    .eq("wallet.name", payload?.walletName);

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
