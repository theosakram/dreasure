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

export const getWalletByType = async (type: string, org_id: string) => {
  const supabase = supabaseClient();
  const { data: wallet } = await supabase
    .from("wallets")
    .select(`*, transactions(*)`)
    .eq("type", type)
    .eq("org_id", org_id)
    .single<WalletWithTransactions>();

  return wallet;
};
