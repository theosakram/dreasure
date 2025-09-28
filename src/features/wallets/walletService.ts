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

export const getWalletByName = async (name: string) => {
  const supabase = supabaseClient();
  const { data: wallet } = await supabase
    .from("wallets")
    .select(`*, transactions(*)`)
    .eq("name", name)
    .single<WalletWithTransactions>();

  return wallet;
};
