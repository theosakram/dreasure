"use client";

import { AddTransactionModal } from "@/components/containers/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { SearchName } from "@/components/containers/SearchName";
import { TableContainer } from "@/components/containers/TableContainers";
import { transactionColumns } from "@/components/containers/transactions/TransactionsColumns";
import { TimeFilter } from "@/components/custom";
import { useGetBergulirTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useGetBergulirWallet } from "@/features/wallets/walletHooks";
import { moneyFlowMapper } from "@/utils/helpers/moneyFlowMapper";
import { Button, ButtonGroup, Menu, Portal, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  TbMoneybag,
  TbReceipt,
  TbChevronDown,
  TbDownload,
  TbCreditCard,
} from "react-icons/tb";

const RevolvingPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { data, isLoading, error, isRefetching } = useGetBergulirTransactions();
  const { data: bergulir } = useGetBergulirWallet();
  const mappedBergulir = useMemo(
    () => moneyFlowMapper(bergulir?.transactions || []),
    [bergulir?.transactions],
  );

  return (
    <Stack gap={6}>
      <MoneyFlowContainer {...mappedBergulir} isLoading={isLoading} />
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
        customAddButton={
          <ButtonGroup size="sm" variant="outline">
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  variant="solid"
                  colorPalette="brand"
                  fontWeight="semibold"
                  px={6}
                  _hover={{
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s ease"
                >
                  <TbCreditCard />
                  Cicilan
                  <TbChevronDown />
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content
                    bg="bg.panel"
                    borderRadius="xl"
                    boxShadow="xl"
                    p={2}
                    minW="200px"
                  >
                    <Menu.Item
                      value="ambil-cicilan"
                      p={3}
                      borderRadius="lg"
                      _hover={{
                        bg: "brand.muted",
                        color: "brand.fg",
                      }}
                      fontWeight="medium"
                      cursor="pointer"
                    >
                      <TbDownload />
                      Ambil Cicilan
                    </Menu.Item>
                    <Menu.Item
                      value="bayar-cicilan"
                      p={3}
                      borderRadius="lg"
                      _hover={{
                        bg: "success.muted",
                        color: "success.fg",
                      }}
                      fontWeight="medium"
                    >
                      <TbReceipt />
                      Bayar Cicilan
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Button
              variant="solid"
              colorPalette="cyan"
              fontWeight="semibold"
              px={6}
              _hover={{
                boxShadow: "lg",
              }}
              transition="all 0.2s ease"
            >
              <TbMoneybag />
              Donasi
            </Button>
          </ButtonGroup>
        }
      />

      <AddTransactionModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        type="bergulir"
      />
    </Stack>
  );
};

export default RevolvingPage;
