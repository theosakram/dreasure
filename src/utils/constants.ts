import { WalletName } from "@/features/wallets/walletTypes";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const walletNames: Record<string, WalletName> = {
  kas: "kas",
  bergulir: "bergulir",
};
