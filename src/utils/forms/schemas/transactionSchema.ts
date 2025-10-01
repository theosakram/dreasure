import z from "zod";

export const addTransactionSchema = z.object({
  wallet_id: z.string().min(1, "Dompet harus dipilih"),
  user_id: z.string().min(1, "Anggota harus dipilih"),
  type: z.enum(["deposit", "withdraw"], "Jenis transaksi harus dipilih"),
  amount: z.coerce.number().min(1, "Jumlah harus diisi"),
  description: z.string().optional(),
});

export const installmentPaymentSchema = z.object({
  installment_id: z.string().min(1, "Cicilan harus dipilih"),
  amount: z.coerce.number().min(1, "Jumlah harus diisi"),
  description: z.string().optional(),
  wallet_id: z.string().min(1, "Dompet harus dipilih"),
  user_id: z.string().min(1, "Anggota harus dipilih"),
  paid_date: z.string().optional(),
});

export const installmentSchema = z.object({
  user_id: z.string().min(1, "Anggota harus dipilih"),
  total_to_be_paid: z.coerce.number().min(1, "Jumlah harus diisi"),
  start_date: z.string("Tanggal mulai harus diisi"),
  due_date: z.string("Tanggal jatuh tempo harus diisi"),
  description: z.string().optional(),
});
