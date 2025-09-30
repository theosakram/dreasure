import { TransactionType } from "@/features/transactions/transactionTypes";
import { WalletTypes } from "@/features/wallets/walletTypes";
import {
  VStack,
  Text,
  Box,
  HStack,
  Badge,
  Skeleton,
  Circle,
  Separator,
  Button,
  Group,
  Input,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { ReactNode, useState, useMemo } from "react";
import {
  LuArrowUpRight,
  LuArrowDownRight,
  LuReceipt,
  LuChevronDown,
  LuSearch,
  LuFilter,
  LuCalendar,
} from "react-icons/lu";

type TransactionEvent = {
  title: ReactNode;
  date: string;
  amount: number;
  id: string | number;
  type: TransactionType;
  description?: string;
  walletName: string;
  walletType: WalletTypes;
};

type MemberTransactionListProps = {
  timelines: TransactionEvent[];
  title?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  showAmount?: boolean;
  maxWidth?: string;
  variant?: "default" | "compact" | "detailed";
  initialDisplayCount?: number;
  enableSearch?: boolean;
  enableFiltering?: boolean;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const TransactionSkeleton = () => (
  <VStack align="stretch" gap={3}>
    {Array.from({ length: 5 }).map((_, i) => (
      <HStack key={i} gap={4} p={4} bg="bg.subtle" borderRadius="lg">
        <Skeleton boxSize="12" borderRadius="full" />
        <VStack align="start" gap={2} flex="1">
          <Skeleton height="4" width="70%" borderRadius="md" />
          <Skeleton height="3" width="50%" borderRadius="md" />
        </VStack>
        <VStack align="end" gap={1}>
          <Skeleton height="5" width="80px" borderRadius="md" />
          <Skeleton height="3" width="50px" borderRadius="md" />
        </VStack>
      </HStack>
    ))}
  </VStack>
);

export const MemberTransactionTimeline = ({
  timelines,
  isLoading = false,
  emptyMessage = "Belum ada transaksi",
  showAmount = true,
  maxWidth = "100%",
  initialDisplayCount = 20,
  enableSearch = true,
  enableFiltering = true,
}: MemberTransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw">(
    "all",
  );
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [dateRange, setDateRange] = useState<"all" | "week" | "month" | "year">(
    "all",
  );

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    let filtered = timelines;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          formatCurrency(t.amount)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = dayjs();
      const cutoffDate = {
        week: now.subtract(7, "day"),
        month: now.subtract(1, "month"),
        year: now.subtract(1, "year"),
      }[dateRange];

      filtered = filtered.filter((t) => dayjs(t.date).isAfter(cutoffDate));
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  }, [timelines, searchTerm, filterType, dateRange]);

  // Paginated transactions
  const displayedTransactions = filteredTransactions.slice(0, displayCount);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    return displayedTransactions.reduce((acc, transaction) => {
      const date = dayjs(transaction.date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, TransactionEvent[]>);
  }, [displayedTransactions]);

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) =>
    dayjs(b).diff(dayjs(a)),
  );

  const hasMore = filteredTransactions.length > displayCount;
  const showingCount = displayedTransactions.length;
  const totalCount = filteredTransactions.length;

  if (isLoading) {
    return <TransactionSkeleton />;
  }

  if (!timelines.length) {
    return (
      <VStack gap={8} py={12} align="center">
        <Circle bg="gray.100" size="20" color="gray.400">
          <LuReceipt size={32} />
        </Circle>
        <VStack gap={2} textAlign="center">
          <Text fontSize="lg" fontWeight="bold" color="fg">
            Belum ada transaksi
          </Text>
          <Text fontSize="sm" color="fg.muted" maxW="300px">
            {emptyMessage}
          </Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={6} w="full" maxW={maxWidth}>
      {/* Search and Filter Controls */}
      {(enableSearch || enableFiltering) && timelines.length > 5 && (
        <VStack gap={4} align="stretch">
          {/* Search */}
          {enableSearch && (
            <Box position="relative">
              <Input
                placeholder="Cari transaksi atau nominal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                pl={10}
                bg="bg.subtle"
                borderColor="border.muted"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                }}
              />
              <Circle
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                size="4"
                color="fg.muted"
              >
                <LuSearch size={14} />
              </Circle>
            </Box>
          )}

          {/* Filters */}
          {enableFiltering && (
            <HStack gap={3} wrap="wrap">
              <Group gap={2}>
                <Circle bg="blue.100" size="6" color="blue.600">
                  <LuFilter size={12} />
                </Circle>
                <Text fontSize="sm" fontWeight="medium" color="fg">
                  Filter:
                </Text>
              </Group>

              {/* Type Filter */}
              <Group attached>
                <Button
                  size="sm"
                  variant={filterType === "all" ? "solid" : "surface"}
                  colorPalette="gray"
                  onClick={() => setFilterType("all")}
                >
                  Semua
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "deposit" ? "solid" : "surface"}
                  colorPalette="green"
                  onClick={() => setFilterType("deposit")}
                >
                  Setoran
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "withdraw" ? "solid" : "surface"}
                  colorPalette="red"
                  onClick={() => setFilterType("withdraw")}
                >
                  Penarikan
                </Button>
              </Group>

              {/* Date Range Filter */}
              <Group attached>
                <Button
                  size="sm"
                  variant={dateRange === "all" ? "solid" : "surface"}
                  colorPalette="gray"
                  onClick={() => setDateRange("all")}
                >
                  Semua
                </Button>
                <Button
                  size="sm"
                  variant={dateRange === "week" ? "solid" : "surface"}
                  colorPalette="blue"
                  onClick={() => setDateRange("week")}
                >
                  7 Hari
                </Button>
                <Button
                  size="sm"
                  variant={dateRange === "month" ? "solid" : "surface"}
                  colorPalette="blue"
                  onClick={() => setDateRange("month")}
                >
                  1 Bulan
                </Button>
                <Button
                  size="sm"
                  variant={dateRange === "year" ? "solid" : "surface"}
                  colorPalette="blue"
                  onClick={() => setDateRange("year")}
                >
                  1 Tahun
                </Button>
              </Group>
            </HStack>
          )}

          {/* Results Summary */}
          <HStack justify="space-between" align="center" py={2}>
            <Text fontSize="sm" color="fg.muted">
              {totalCount === timelines.length
                ? `Menampilkan ${showingCount} dari ${totalCount} transaksi`
                : `Ditemukan ${totalCount} transaksi • Menampilkan ${showingCount}`}
            </Text>
            {(searchTerm || filterType !== "all" || dateRange !== "all") && (
              <Button
                size="xs"
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setDateRange("all");
                  setDisplayCount(initialDisplayCount);
                }}
              >
                Reset Filter
              </Button>
            )}
          </HStack>
        </VStack>
      )}

      {/* No results state */}
      {filteredTransactions.length === 0 &&
        (searchTerm || filterType !== "all" || dateRange !== "all") && (
          <VStack gap={6} py={12} align="center">
            <Circle bg="gray.100" size="16" color="gray.400">
              <LuSearch size={24} />
            </Circle>
            <VStack gap={2} textAlign="center">
              <Text fontSize="md" fontWeight="semibold" color="fg">
                Tidak ada transaksi ditemukan
              </Text>
              <Text fontSize="sm" color="fg.muted" maxW="300px">
                Coba ubah kriteria pencarian atau filter
              </Text>
            </VStack>
          </VStack>
        )}

      {/* Transaction List */}
      {sortedDates.map((date) => {
        const transactions = groupedTransactions[date];
        const isToday = dayjs().isSame(dayjs(date), "day");
        const isYesterday = dayjs()
          .subtract(1, "day")
          .isSame(dayjs(date), "day");

        let dateLabel = dayjs(date).format("DD MMMM YYYY");
        if (isToday) dateLabel = "Hari ini";
        else if (isYesterday) dateLabel = "Kemarin";

        return (
          <VStack key={date} align="stretch" gap={3}>
            {/* Date Header */}
            <HStack gap={3} align="center" py={2}>
              <HStack gap={2}>
                <Circle bg="blue.100" size="6" color="blue.600">
                  <LuCalendar size={12} />
                </Circle>
                <Text fontSize="sm" fontWeight="bold" color="fg">
                  {dateLabel}
                </Text>
              </HStack>
              <Separator flex="1" />
              <Badge variant="surface" size="xs" borderRadius="full">
                {transactions.length} transaksi
              </Badge>
            </HStack>

            {/* Transaction Cards */}
            <VStack gap={2} align="stretch">
              {transactions.map((transaction) => (
                <Box
                  key={transaction.id}
                  p={4}
                  bg="bg.subtle"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="border.muted"
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <HStack gap={4} align="center">
                    <Circle
                      bg={
                        transaction.type === "deposit" ? "green.100" : "red.100"
                      }
                      size="12"
                      color={
                        transaction.type === "deposit" ? "green.600" : "red.600"
                      }
                      flexShrink={0}
                    >
                      {transaction.type === "deposit" ? (
                        <LuArrowUpRight size={20} />
                      ) : (
                        <LuArrowDownRight size={20} />
                      )}
                    </Circle>

                    <VStack gap={1} align="start" flex="1" minW="0">
                      <HStack gap={2} align="center" w="full">
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="fg"
                          truncate
                        >
                          {transaction.type === "deposit"
                            ? "Setoran"
                            : "Penarikan"}
                        </Text>
                        <Badge
                          colorPalette={
                            transaction.type === "deposit" ? "green" : "red"
                          }
                          variant="surface"
                          size="sm"
                          borderRadius="full"
                        >
                          {transaction.type === "deposit" ? "Masuk" : "Keluar"}
                        </Badge>
                        <Badge
                          colorPalette={
                            transaction.walletType === "transaction"
                              ? "blue"
                              : "orange"
                          }
                          variant="surface"
                          size="sm"
                          borderRadius="full"
                          textTransform="capitalize"
                        >
                          {transaction.walletName}
                        </Badge>
                      </HStack>
                      <Text
                        fontSize="sm"
                        color="fg.muted"
                        truncate
                        maxW="300px"
                      >
                        {transaction.description || "Tanpa keterangan"}
                      </Text>
                      <Text fontSize="xs" color="fg.muted" opacity={0.8}>
                        {dayjs(transaction.date).format("HH:mm")}
                      </Text>
                    </VStack>

                    {showAmount && (
                      <VStack gap={1} align="end" flexShrink={0}>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color={
                            transaction.type === "deposit"
                              ? "green.500"
                              : "red.500"
                          }
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </Text>
                      </VStack>
                    )}
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        );
      })}

      {/* Load More / Pagination */}
      {hasMore && (
        <VStack gap={4} py={6}>
          <Separator />
          <VStack gap={3} align="center">
            <Text fontSize="sm" color="fg.muted" textAlign="center">
              Menampilkan {showingCount} dari {totalCount} transaksi
            </Text>
            <Group gap={2}>
              <Button
                variant="surface"
                size="sm"
                onClick={() => setDisplayCount((prev) => prev + 20)}
                borderRadius="full"
              >
                <LuChevronDown />
                Muat 20 Lagi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplayCount(totalCount)}
                borderRadius="full"
              >
                Tampilkan Semua ({totalCount})
              </Button>
            </Group>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};
