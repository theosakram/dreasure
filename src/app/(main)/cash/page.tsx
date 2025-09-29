"use client";

import { AddTransactionModal } from "@/components/containers/transactions/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { TableContainer } from "@/components/containers/TableContainers";
import { TimeFilter } from "@/components/custom/TimeFilter";
import { useGetKasTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useGetKasWallet } from "@/features/wallets/walletHooks";
import { moneyFlowMapper } from "@/utils/helpers/moneyFlowMapper";
import { Stack, Skeleton, VStack } from "@chakra-ui/react";
import { Suspense, useMemo, useState } from "react";
import { SearchName } from "@/components/containers/SearchName";
import { transactionColumns } from "@/components/containers/transactions/TransactionsColumns";
import { useSearchParams } from "next/navigation";

// Loading fallback for the entire page
const DashboardSkeleton = () => (
  <Stack gap={6}>
    {/* MoneyFlow skeleton */}
    <VStack gap={4}>
      <Skeleton height="120px" width="full" borderRadius="xl" />
      <Stack direction="row" gap={4} width="full">
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
        <Skeleton height="80px" flex="1" borderRadius="lg" />
      </Stack>
    </VStack>

    {/* TimeFilter skeleton */}
    <Skeleton height="40px" width="320px" borderRadius="lg" />

    {/* SearchName skeleton */}
    <Skeleton height="40px" width="280px" borderRadius="md" />

    {/* Table skeleton */}
    <VStack gap={3}>
      <Skeleton height="60px" width="full" borderRadius="lg" />
      <Skeleton height="300px" width="full" borderRadius="lg" />
    </VStack>
  </Stack>
);

// Component that uses hooks with useSearchParams
const DashboardContent = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data, isLoading, error, isRefetching } = useGetKasTransactions();
  const { count, data: transactions } = data || {};
  const { data: kas } = useGetKasWallet();
  const mappedKas = useMemo(
    () => moneyFlowMapper(kas?.transactions || []),
    [kas?.transactions],
  );
  const searchParams = useSearchParams();
  const page = +(searchParams.get("page") ?? "1");

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...mappedKas} isLoading={isLoading} />

      <TimeFilter />

      <SearchName />

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
        errorTitle="Failed to load transactions"
        errorDescription="We couldn't load your transaction data. Please check your connection and try again."
        onRetry={() => window.location.reload()}
        loadingMessage="Memuat data transaksi..."
        scrollMaxH="47.5vh"
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
        type="kas"
      />
    </Stack>
  );
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
