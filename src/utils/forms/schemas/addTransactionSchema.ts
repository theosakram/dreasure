import z from "zod";

export const addTransactionSchema = z.object({
  user_id: z.string().min(1, "Anggota harus dipilih"),
  amount: z.coerce.number().min(1, "Jumlah harus diisi"),
  type: z.enum(["deposit", "withdrawal"]),
  description: z.string().optional(),
});
