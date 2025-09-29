import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../TableCell";
import { InstallmentWithUser } from "@/features/installments/installmentTypes";

export const installmentColumnHelper =
  createColumnHelper<InstallmentWithUser>();

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
      <TableCell.Amount amount={info.getValue()} type="withdraw" />
    ),
  }),
  installmentColumnHelper.display({
    id: "type",
    header: "Jenis",
    size: 100,
    cell: () => <TableCell.TypeBadge type="withdraw" />,
  }),
];
