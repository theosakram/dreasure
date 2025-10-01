import { Transaction } from "@/features/transactions/transactionTypes";
import { Button } from "@chakra-ui/react";
import { TbMoneybag } from "react-icons/tb";
import { TableContainer } from "../table/TableContainers";
import { transactionColumns } from "../transactions/TransactionsColumns";
import { useGetInstallmentWalletTransactions } from "@/features/transactions/transactionHooks";
import { AddTransactionModal } from "../transactions/AddTransactionModal";
import { useState } from "react";
import { TimeFilter } from "@/components/custom";
import { SearchName } from "../SearchName";

export const DonationTable = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data, isLoading, error, isRefetching } =
    useGetInstallmentWalletTransactions();
  const { count, data: transactions } = data || {};

  return (
    <>
      <TableContainer<Transaction>
        data={transactions}
        columns={transactionColumns}
        isLoading={isLoading || isRefetching}
        isError={!!error}
        title="Donasi Terbaru"
        subtitle={`${transactions?.length || 0} donasi`}
        addButtonLabel="Tambah Donasi"
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
        filterSlot={
          <>
            <TimeFilter />
            <SearchName />
          </>
        }
        pagination={{
          total: count || 0,
          pageSize: 10,
          currentPage: 1,
          onPageChange: console.log,
        }}
        customAddButton={
          <Button
            size="sm"
            variant="solid"
            colorPalette="cyan"
            fontWeight="semibold"
            px={6}
            _hover={{
              boxShadow: "lg",
            }}
            transition="all 0.2s ease"
            onClick={() => setAddModalOpen(true)}
          >
            <TbMoneybag />
            Donasi
          </Button>
        }
      />

      <AddTransactionModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        type="installment"
      />
    </>
  );
};
