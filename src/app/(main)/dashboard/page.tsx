"use client";

import { MoneyFlowContainer } from "@/components/containers/MoneyFlowContainer";
import { TableContainer } from "@/components/containers/TableContainers";
import { TimeFilter } from "@/components/custom/TimeFilter";
import { useGetTransactions } from "@/features/transactions/transactionHooks";
import { Transaction } from "@/features/transactions/transactionTypes";
import {
  Box,
  Portal,
  FormatNumber,
  Stack,
  Text,
  Separator,
  Popover,
  Badge,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "week" | "month" | "all"
  >("all");

  const { data, isLoading, error } = useGetTransactions();

  const handleAddTransaction = () => {
    console.log("Add new transaction");
    // TODO: Implement add transaction functionality
  };

  // Filter data based on time period
  const getFilteredData = () => {
    if (timeFilter === "all") return data || [];

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let cutoffDate: Date;
    switch (timeFilter) {
      case "today":
        cutoffDate = startOfToday;
        break;
      case "week":
        cutoffDate = startOfWeek;
        break;
      case "month":
        cutoffDate = startOfMonth;
        break;
      default:
        return data || [];
    }

    if (data) {
      return data?.filter((transaction) => {
        const transactionDate = new Date(
          transaction.created_at || transaction.id,
        );
        return transactionDate >= cutoffDate;
      });
    }

    return [];
  };

  const filteredData = getFilteredData();

  // Helper function to get time filter label
  const getTimeFilterLabel = (filter: typeof timeFilter) => {
    const labels = {
      today: "Hari Ini",
      week: "7 Hari Terakhir",
      month: "Bulan Ini",
      all: "Sepanjang Waktu",
    };
    return labels[filter];
  };

  const columnHelper = createColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      size: 80,
      cell: (info) => (
        <Text fontFamily="mono" fontSize="sm" color="fg.muted">
          #{String(info.getValue()).slice(-6)}
        </Text>
      ),
    }),
    columnHelper.accessor("user", {
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
    columnHelper.accessor("user.position", {
      header: "Jabatan",
      size: 80,
      cell: (info) => {
        const position = info.getValue();
        if (!position) {
          return (
            <Text fontSize="sm" color="fg.muted">
              -
            </Text>
          );
        }

        return (
          <Text fontSize="sm" fontWeight="medium">
            {position}
          </Text>
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
      size: 200,
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

  return (
    <Box p={6}>
      <Stack gap={6}>
        <TimeFilter value={timeFilter} onChange={setTimeFilter} />

        <MoneyFlowContainer />

        <Separator />

        <TableContainer<Transaction>
          data={filteredData}
          columns={columns}
          isLoading={isLoading}
          isError={!!error}
          title="Transaksi Terbaru"
          subtitle={`${filteredData.length} transaksi${
            timeFilter !== "all"
              ? ` in ${getTimeFilterLabel(timeFilter).toLowerCase()}`
              : ""
          }`}
          addButtonLabel="Tambah Transaksi"
          onAddClick={handleAddTransaction}
          variant="line"
          size="md"
          interactive
          emptyTitle="No transactions found"
          emptyDescription={
            timeFilter !== "all"
              ? `No transactions found for ${getTimeFilterLabel(
                  timeFilter,
                ).toLowerCase()}. Try adjusting your filter or add a new transaction.`
              : "Start by adding your first transaction to track your money flow."
          }
          emptyActionLabel="Add First Transaction"
          onEmptyAction={handleAddTransaction}
          errorTitle="Failed to load transactions"
          errorDescription="We couldn't load your transaction data. Please check your connection and try again."
          onRetry={() => window.location.reload()}
          loadingMessage="Loading your transactions..."
        />
      </Stack>
    </Box>
  );
}
