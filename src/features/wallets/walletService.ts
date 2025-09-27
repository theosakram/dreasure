import { supabaseClient } from "@/supabase/client";
import { GetWalletsResponse, WalletWithTransactions } from "./walletTypes";

export const getWallets = async () => {
  const supabase = supabaseClient();
  const { data: wallets } = await supabase
    .from("wallets")
    .select(`*, transactions(*)`)
    .overrideTypes<Array<GetWalletsResponse>>();

  return wallets;
};

export const getKasWallet = async () => {
  const supabase = supabaseClient();
  const { data: wallet } = await supabase
    .from("wallets")
    .select(
      `
    *,
    transactions (
      id,
      amount,
      type,
      created_at
    )
  `,
    )
    .eq("name", "kas")
    .single<WalletWithTransactions>();

  return wallet;
};
