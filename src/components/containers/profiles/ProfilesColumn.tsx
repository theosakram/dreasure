import { Profile } from "@/features/profiles/profileTypes";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../TableCell";

export const profileColumnHelper = createColumnHelper<
  Profile & { role: string }
>();

export const profileColumns = [
  profileColumnHelper.accessor("fullname", {
    header: "Nama Lengkap",
    cell: (info) => info.getValue(),
  }),
  profileColumnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  profileColumnHelper.accessor("phone", {
    header: "No. Handphone",
    cell: (info) => info.getValue() || "-",
  }),
  profileColumnHelper.accessor("role", {
    header: "Peran",
    cell: (info) => <TableCell.OrgRoleBadge role={info.getValue()} />,
  }),
  ,
].filter(Boolean) as ColumnDef<Profile & { role: string }, unknown>[];
