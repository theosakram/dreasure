import z from "zod";

export const addTransactionSchema = z.object({
  wallet_id: z.string().min(1, "Dompet harus dipilih"),
  user_id: z.string().min(1, "Anggota harus dipilih"),
  type: z.enum(["deposit", "withdraw"]),
  amount: z.coerce.number().min(1, "Jumlah harus diisi"),
  description: z.string().optional(),
});
