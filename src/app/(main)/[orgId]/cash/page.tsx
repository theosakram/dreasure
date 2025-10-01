"use client";

import { AddTransactionModal } from "@/components/containers/transactions/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { TableContainer } from "@/components/containers/table/TableContainers";
import { TimeFilter } from "@/components/custom/TimeFilter";
import { useGetTransactionWalletTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useGetTransactionWallet } from "@/features/wallets/walletHooks";
import { Stack } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { SearchName } from "@/components/containers/SearchName";
import { transactionColumns } from "@/components/containers/transactions/TransactionsColumns";
import { useSearchParams } from "next/navigation";
import { useFinancialPercentages } from "@/utils/helpers/hooks/useFinancialPercentages";
import { Loader } from "@/components/custom/Loader";

const CashContent = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data, isLoading, error, isRefetching } =
    useGetTransactionWalletTransactions();
  const { count, data: transactions } = data || {};
  const { data: kas } = useGetTransactionWallet();
  const financialPercentages = useFinancialPercentages(kas?.transactions || []);

  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") ?? "1");

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...financialPercentages} isLoading={isLoading} />

      <TableContainer<Transaction>
        data={transactions}
        columns={transactionColumns}
        isLoading={isLoading || isRefetching}
        isError={!!error}
        title="Transaksi Terbaru"
        subtitle={`${transactions?.length || 0} transaksi`}
        addButtonLabel="Tambah Transaksi"
        onAddClick={() => setAddModalOpen(true)}
        variant="line"
        size="md"
        interactive
        emptyTitle="No transactions found"
        emptyDescription="Tidak ada transaksi"
        emptyActionLabel="Tambah Transaksi Pertama"
        errorTitle="Gagal Memuat Transaksi"
        errorDescription="We couldn't load your transaction data. Please check your connection and try again."
        onRetry={() => window.location.reload()}
        loadingMessage="Memuat data transaksi..."
        scrollMaxH="47.5vh"
        filterSlot={
          <>
            <TimeFilter />
            <SearchName />
          </>
        }
        pagination={{
          total: count || 0,
          pageSize: 10,
          currentPage: page,
          onPageChange: console.log,
        }}
      />

      <AddTransactionModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        type="transaction"
      />
    </Stack>
  );
};

export default function CashPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CashContent />
    </Suspense>
  );
}
