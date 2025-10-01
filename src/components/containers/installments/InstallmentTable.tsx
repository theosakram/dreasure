import { useState } from "react";
import { InstallmentModal } from "../transactions/InstallmentModal";
import { useGetInstallments } from "@/features/installments/installmentHooks";
import { Menu, Button, Portal } from "@chakra-ui/react";
import {
  TbCreditCard,
  TbChevronDown,
  TbDownload,
  TbReceipt,
} from "react-icons/tb";
import { TableContainer } from "../table/TableContainers";
import { InstallmentWithUser } from "@/features/installments/installmentTypes";
import {
  installmentColumnHelper,
  installmentColumns,
} from "./InstallmentColumns";
import { ActionMenu } from "@/components/custom/ActionMenu";
import { useRouter } from "next/navigation";

export const InstallmentTable = () => {
  const router = useRouter();
  const [installmentModalOpen, setInstallmentModalOpen] = useState(false);
  const [installmentType, setInstallmentType] = useState<"take" | "pay">(
    "take",
  );

  const { data, isLoading, isRefetching, error } = useGetInstallments();
  const { count, data: installments } = data || {};

  const columns = [
    ...installmentColumns,
    installmentColumnHelper.display({
      id: "actions",
      header: "",
      size: 120,
      cell: (info) => (
        <ActionMenu
          onDetail={() => router.push(`/revolving/${info.row.original.id}`)}
        />
      ),
    }),
  ];

  return (
    <>
      <TableContainer<InstallmentWithUser>
        data={installments}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={!!error}
        title="Hutang Terbaru"
        subtitle={`${installments?.length || 0} hutang`}
        addButtonLabel="Tambah Hutang"
        onAddClick={() => setInstallmentModalOpen(true)}
        variant="line"
        size="md"
        interactive
        emptyTitle="Belum ada transaksi"
        emptyDescription="Mulai catat transaksi pertama Anda"
        emptyActionLabel="Tambah Transaksi Pertama"
        errorTitle="Gagal memuat transaksi"
        errorDescription="Kami tidak dapat memuat data transaksi Anda. Silakan periksa koneksi Anda dan coba lagi."
        onRetry={() => window.location.reload()}
        loadingMessage="Memuat data transaksi..."
        scrollMaxH="47.5vh"
        pagination={{
          total: count || 0,
          pageSize: 10,
          currentPage: 1,
          onPageChange: console.log,
        }}
        customAddButton={
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                size="sm"
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
                      bg: "brand.muted",
                      color: "brand.fg",
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
        }
      />

      <InstallmentModal
        type={installmentType}
        modalProps={{
          open: installmentModalOpen,
          setOpen: setInstallmentModalOpen,
        }}
      />
    </>
  );
};
