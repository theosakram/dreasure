import z from "zod";

export const orgMembershipSchema = z.object({
  role: z.enum(["member", "admin", "owner"]),
  fullname: z.string("Nama tidak boleh kosong").min(2).max(100),
});
