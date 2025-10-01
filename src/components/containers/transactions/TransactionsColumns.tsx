import { Transaction } from "@/features/transactions/transactionTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "../TableCell";

const columnHelper = createColumnHelper<Transaction>();
export const transactionColumns = [
  columnHelper.accessor("userProfile", {
    header: "Anggota",
    size: 100,
    cell: (info) => <TableCell.User {...info.getValue()} />,
  }),
  columnHelper.accessor("created_at", {
    header: "Tanggal Transaksi",
    size: 80,
    cell: (info) => <TableCell.TransactionDate date={info.getValue()} />,
  }),
  columnHelper.accessor("description", {
    header: "Catatan",
    size: 150,
    cell: (info) => (
      <TableCell.Description description={info.getValue() || ""} />
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Jumlah",
    size: 120,
    cell: (info) => (
      <TableCell.Amount
        amount={info.getValue()}
        type={info.row.original.type}
      />
    ),
  }),
  columnHelper.accessor("type", {
    header: "Jenis",
    size: 100,
    cell: (info) => (
      <TableCell.TypeBadge variant="transaction" type={info.getValue()} />
    ),
  }),
];
