"use client";

import { AddTransactionModal } from "@/components/containers/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { TableContainer } from "@/components/containers/TableContainers";
import { TimeFilter } from "@/components/custom/TimeFilter";
import { useGetKasTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useGetKasWallet } from "@/features/wallets/walletHooks";
import { moneyFlowMapper } from "@/utils/helpers/moneyFlowMapper";
import { Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { SearchName } from "@/components/containers/SearchName";
import { transactionColumns } from "@/components/containers/transactions/TransactionsColumns";

export default function DashboardPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data, isLoading, error, isRefetching } = useGetKasTransactions();
  const { data: kas } = useGetKasWallet();
  const mappedKas = useMemo(
    () => moneyFlowMapper(kas?.transactions || []),
    [kas?.transactions],
  );

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...mappedKas} isLoading={isLoading} />
      <TimeFilter />
      <SearchName />

      <TableContainer<Transaction>
        data={data}
        columns={transactionColumns}
        isLoading={isLoading || isRefetching}
        isError={!!error}
        title="Transaksi Terbaru"
        subtitle={`${data?.length || 0} transaksi`}
        addButtonLabel="Tambah Transaksi"
        onAddClick={() => setAddModalOpen(true)}
        variant="line"
        size="md"
        interactive
        emptyTitle="No transactions found"
        emptyDescription="Tidak ada transaksi"
        emptyActionLabel="Tambah Transaksi Pertama"
        errorTitle="Failed to load transactions"
        errorDescription="We couldn't load your transaction data. Please check your connection and try again."
        onRetry={() => window.location.reload()}
        loadingMessage="Memuat data transaksi..."
        scrollMaxH="47.5vh"
      />

      <AddTransactionModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        type="kas"
      />
    </Stack>
  );
}
