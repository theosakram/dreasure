import { VStack, Text, Box, HStack, Separator } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { Loader } from "../../custom/Loader";
import { Empty } from "../../custom";
import {
  TransactionTimelineCard,
  type TransactionTimelineCardProps,
} from "./TransactionTimelineCard";
import { sortByDateDesc } from "@/utils/helpers/sortByDateDesc";

type TransactionListProps = {
  timelines: TransactionTimelineCardProps[];
  isLoading?: boolean;
};

type GroupedTransactions = Record<string, TransactionTimelineCardProps[]>;

const groupByDate = (
  transactions: TransactionTimelineCardProps[],
): GroupedTransactions =>
  sortByDateDesc(transactions).reduce((acc, transaction) => {
    const date = dayjs(transaction.date).format("YYYY-MM-DD");
    (acc[date] ??= []).push(transaction);
    return acc;
  }, {} as GroupedTransactions);

const getDateLabel = (date: string): string => {
  const target = dayjs(date);
  const now = dayjs();
  if (now.isSame(target, "day")) return "Hari ini";
  if (now.subtract(1, "day").isSame(target, "day")) return "Kemarin";
  return target.format("DD MMMM YYYY");
};

const DateHeader = ({ date, count }: { date: string; count: number }) => (
  <HStack gap={2} align="center">
    <Text
      fontSize="xs"
      fontWeight="semibold"
      color="fg.muted"
      textTransform="uppercase"
      letterSpacing="wide"
    >
      {getDateLabel(date)}
    </Text>
    <Box h="1px" flex="1" bg="border.subtle" />
    <Text fontSize="xs" color="fg.muted">
      {count}
    </Text>
  </HStack>
);

const TransactionGroup = ({
  date,
  transactions,
  showSeparator,
}: {
  date: string;
  transactions: TransactionTimelineCardProps[];
  showSeparator: boolean;
}) => (
  <VStack key={date} align="stretch" gap={3}>
    {showSeparator && <Separator />}
    <DateHeader date={date} count={transactions.length} />
    <VStack gap={2} align="stretch">
      {transactions.map((transaction) => (
        <TransactionTimelineCard key={transaction.id} {...transaction} />
      ))}
    </VStack>
  </VStack>
);

export const TransactionTimeline = ({
  timelines,
  isLoading = false,
}: TransactionListProps) => {
  const groupedTransactions = useMemo(
    () => groupByDate(timelines),
    [timelines],
  );

  const sortedDates = useMemo(
    () =>
      sortByDateDesc(
        Object.keys(groupedTransactions).map((d) => ({ date: d })),
      ).map((d) => d.date),
    [groupedTransactions],
  );

  if (isLoading) return <Loader />;
  if (!timelines.length) return <Empty />;

  return (
    <VStack align="stretch" gap={5} w="full">
      {sortedDates.map((date, index) => (
        <TransactionGroup
          key={date}
          date={date}
          transactions={groupedTransactions[date]}
          showSeparator={index > 0}
        />
      ))}
    </VStack>
  );
};
