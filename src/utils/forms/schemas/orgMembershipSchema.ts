import { indonesianPhoneRegex } from "@/utils/constants";
import z from "zod";

export const orgMembershipSchema = z.object({
  role: z.enum(["member", "admin", "owner"]),
  fullname: z.string("Nama tidak boleh kosong").min(2).max(100),
  email: z.email("Email tidak valid").max(100).optional(),
  phone: z
    .string()
    .regex(indonesianPhoneRegex, "Nomor telepon tidak valid")
    .optional(),
});
