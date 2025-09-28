"use client";

import { AddTransactionModal } from "@/components/containers/transactions/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { SearchName } from "@/components/containers/SearchName";
import { TableContainer } from "@/components/containers/TableContainers";
import { transactionColumns } from "@/components/containers/transactions/TransactionsColumns";
import { TimeFilter } from "@/components/custom";
import { useGetBergulirTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useGetBergulirWallet } from "@/features/wallets/walletHooks";
import { moneyFlowMapper } from "@/utils/helpers/moneyFlowMapper";
import {
  Button,
  ButtonGroup,
  Menu,
  Portal,
  Stack,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState, Suspense } from "react";
import {
  TbMoneybag,
  TbReceipt,
  TbChevronDown,
  TbDownload,
  TbCreditCard,
} from "react-icons/tb";
import { InstallmentModal } from "@/components/containers/transactions/InstallmentModal";

// Loading fallback for the revolving page
const RevolvingSkeleton = () => (
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
const RevolvingContent = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [installmentModalOpen, setInstallmentModalOpen] = useState(false);
  const [installmentType, setInstallmentType] = useState<"take" | "pay">(
    "take",
  );

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
                  Hutang
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
                      onClick={() => {
                        setInstallmentType("take");
                        setInstallmentModalOpen(true);
                      }}
                    >
                      <TbDownload />
                      Ambil Hutang
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
                      onClick={() => {
                        setInstallmentType("pay");
                        setInstallmentModalOpen(true);
                      }}
                    >
                      <TbReceipt />
                      Bayar Hutang
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
              onClick={() => setAddModalOpen(true)}
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

      <InstallmentModal
        type={installmentType}
        modalProps={{
          open: installmentModalOpen,
          setOpen: setInstallmentModalOpen,
        }}
      />
    </Stack>
  );
};

const RevolvingPage = () => {
  return (
    <Suspense fallback={<RevolvingSkeleton />}>
      <RevolvingContent />
    </Suspense>
  );
};

export default RevolvingPage;
