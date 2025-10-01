import { WalletTypes } from "@/features/wallets/walletTypes";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const walletTypes: Record<string, WalletTypes> = {
  transaction: "transaction",
  installment: "installment",
};

export const indonesianPhoneRegex = /^(?:\+62|0)8\d{7,11}$/;
