import { supabaseClient } from "@/supabase/client";
import { AddTransactionRequest, Transaction } from "./transactionTypes";
import { WalletTypes } from "../wallets/walletTypes";
import { GetPaginationRequest } from "../shared/sharedTypes";

type GetTransactionPayload = {
  gte?: string;
  lte?: string;
  name?: string;
  walletType?: WalletTypes;
  pagination: GetPaginationRequest;
  orgId?: string;
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
        name,
        org_id
      )
      `,
      { count: "exact" },
    )

    .eq("wallet.type", payload?.walletType)
    .eq("wallet.org_id", payload?.orgId);

  if (payload?.gte) query = query.gte("created_at", payload.gte);
  if (payload?.lte) query = query.lte("created_at", payload.lte);
  if (payload?.name)
    query = query.ilike("userProfile.fullname", `%${payload.name}%`);

  query
    .range(payload?.pagination.from || 0, payload?.pagination.to || 9)
    .order("created_at", { ascending: false });

  const { data, error, count } = await query.overrideTypes<Transaction[]>();

  if (error) throw error;

  return { data, count };
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
