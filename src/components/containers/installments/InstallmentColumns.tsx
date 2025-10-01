import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../TableCell";
import { Profile } from "@/features/profiles/profileTypes";
import { TransactionType } from "@/features/transactions/transactionTypes";

export type InstallmentColumnType = {
  user: Profile;
  created_at: string;
  description: string;
  total_to_be_paid: number;
  type: TransactionType;
};

export const installmentColumnHelper =
  createColumnHelper<InstallmentColumnType>();

export const installmentColumns = [
  installmentColumnHelper.accessor("user", {
    header: "Anggota",
    size: 100,
    cell: (info) => <TableCell.User {...info.getValue()} />,
  }),
  installmentColumnHelper.accessor("created_at", {
    header: "Tanggal Transaksi",
    size: 80,
    cell: (info) => <TableCell.TransactionDate date={info.getValue()} />,
  }),
  installmentColumnHelper.accessor("description", {
    header: "Catatan",
    size: 150,
    cell: (info) => (
      <TableCell.Description description={info.getValue() || ""} />
    ),
  }),
  installmentColumnHelper.accessor("total_to_be_paid", {
    header: "Jumlah",
    size: 120,
    cell: (info) => (
      <TableCell.Amount
        amount={info.getValue()}
        type={info.row.original.type}
      />
    ),
  }),
  installmentColumnHelper.accessor("type", {
    header: "Jenis",
    size: 100,
    cell: (info) => (
      <TableCell.TypeBadge
        variant="installment"
        type={info.getValue() as TransactionType}
      />
    ),
  }),
];
