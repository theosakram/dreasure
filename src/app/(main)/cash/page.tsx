"use client";

import { AddTransactionModal } from "@/components/containers/AddTransactionModal";
import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { TableContainer } from "@/components/containers/TableContainers";
import { Form } from "@/components/custom/Form";
import { FormField } from "@/components/custom/FormFIeld";
import { TimeFilter, TimeFilterOption } from "@/components/custom/TimeFilter";
import { useGetTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
import {
  Box,
  Portal,
  FormatNumber,
  Stack,
  Text,
  Popover,
  Badge,
  Input,
  Button,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

export default function DashboardPage() {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);

  const { data, isLoading, error, isRefetching } = useGetTransactions();

  const columnHelper = createColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("userProfile", {
      header: "Anggota",
      size: 100,
      cell: (info) => {
        const user = info.getValue();
        if (!user) {
          return (
            <Text fontSize="sm" color="fg.muted">
              No user data
            </Text>
          );
        }

        return (
          <Stack gap={1}>
            <Text fontWeight="medium" fontSize="sm" lineClamp={1}>
              {user.fullname || "Unknown User"}
            </Text>
            <Text fontSize="xs" color="fg.muted" lineClamp={1}>
              {user.email}
            </Text>
          </Stack>
        );
      },
    }),
    columnHelper.accessor("created_at", {
      header: "Tanggal Transaksi",
      size: 80,
      cell: (info) => (
        <Text fontSize="sm" color="fg.muted" fontWeight="medium">
          {dayjs(info.getValue()).format("DD MMM YYYY, HH:mm")}
        </Text>
      ),
    }),
    columnHelper.accessor("description", {
      header: "Catatan",
      size: 150,
      cell: (info) => {
        const description = info.getValue() || "No description";
        const maxLength = 50;
        const isLong = description.length > maxLength;
        const truncatedText = isLong
          ? `${description.slice(0, maxLength)}...`
          : description;

        if (!isLong) {
          return (
            <Box>
              <Text fontWeight="medium" lineClamp={1}>
                {description}
              </Text>
            </Box>
          );
        }

        return (
          <Popover.Root positioning={{ placement: "top" }}>
            <Popover.Trigger asChild>
              <Box
                cursor="pointer"
                _hover={{ bg: "bg.muted" }}
                rounded="sm"
                p={1}
              >
                <Text fontWeight="medium" lineClamp={1} color="brand.fg">
                  {truncatedText}
                </Text>
              </Box>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content maxW="300px">
                  <Popover.Arrow />
                  <Popover.Body>
                    <Text fontSize="sm" lineHeight="1.5">
                      {description}
                    </Text>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        );
      },
    }),
    columnHelper.accessor("amount", {
      header: "Jumlah",
      size: 120,
      cell: (info) => {
        const amount = info.getValue() || 0;
        const type = info.row.original.type;
        const isPositive = type === "deposit";

        return (
          <Text
            fontWeight="semibold"
            color={isPositive ? "brand.solid" : "red.600"}
          >
            <FormatNumber
              value={amount}
              style="currency"
              currency="IDR"
              signDisplay={isPositive ? "always" : "negative"}
            />
          </Text>
        );
      },
    }),
    columnHelper.accessor("type", {
      header: "Jenis",
      size: 100,
      cell: (info) => (
        <Badge
          colorPalette={info.getValue() === "deposit" ? "brand" : "red"}
          textTransform="uppercase"
        >
          {info.getValue() === "deposit" ? "masuk" : "keluar"}
        </Badge>
      ),
    }),
  ];

  const { shallowPush } = useShallowPush({ type: "replace" });
  const searchParams = useSearchParams();
  const filter =
    (searchParams.get("filter") as TimeFilterOption["value"]) || "all";
  const q = searchParams.get("q") || "";

  return (
    <Stack gap={6}>
      <MoneyFlowContainer />
      <TimeFilter value={filter} onChange={(e) => shallowPush({ filter: e })} />

      <Form initialValues={{ q }} onSubmit={(e) => shallowPush({ q: e.q })}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box w="fit-content">
              <FormField<string> name="q">
                {({ input }) => (
                  <InputGroup
                    flex="1"
                    startElement={<LuSearch />}
                    endElement={
                      q && (
                        <Icon
                          as={LuX}
                          _hover={{ bg: "bg.muted", borderRadius: "full" }}
                          cursor="pointer"
                          onClick={() => shallowPush({ q: "" })}
                        />
                      )
                    }
                  >
                    <Input
                      placeholder="Cari nama..."
                      {...input}
                      bg="bg.panel"
                    />
                  </InputGroup>
                )}
              </FormField>
            </Box>
            <Button type="submit" display="none">
              Submit
            </Button>
          </form>
        )}
      </Form>

      <TableContainer<Transaction>
        data={data}
        columns={columns}
        isLoading={isLoading || isRefetching}
        isError={!!error}
        title="Transaksi Terbaru"
        subtitle={`${data?.length} transaksi`}
        addButtonLabel="Tambah Transaksi"
        onAddClick={() => setIsAddTransactionModalOpen(true)}
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
        open={isAddTransactionModalOpen}
        setOpen={setIsAddTransactionModalOpen}
      />
    </Stack>
  );
}
