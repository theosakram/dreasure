import { TransactionType } from "@/features/transactions/transactionTypes";
import { WalletTypes } from "@/features/wallets/walletTypes";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { HStack, Box, VStack, Badge, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { LuArrowUpRight, LuArrowDownRight } from "react-icons/lu";

export type TransactionTimelineCardProps = {
  date: string;
  amount: number;
  id: string | number;
  type: TransactionType;
  description?: string;
  walletName: string;
  walletType: WalletTypes;
};

export const TransactionTimelineCard = (
  props: TransactionTimelineCardProps,
) => {
  return (
    <HStack
      key={props.id}
      gap={3}
      p={3}
      bg="bg.panel"
      borderRadius="lg"
      border="1px solid"
      borderColor="border.subtle"
      transition="all 0.15s"
      _hover={{
        borderColor: "border.emphasized",
        bg: "bg.subtle",
      }}
      cursor="pointer"
    >
      <Box
        p={2}
        borderRadius="lg"
        bg={props.type === "deposit" ? "green.muted" : "red.muted"}
        color={props.type === "deposit" ? "green.fg" : "red.fg"}
        flexShrink={0}
      >
        {props.type === "deposit" ? (
          <LuArrowUpRight size={16} />
        ) : (
          <LuArrowDownRight size={16} />
        )}
      </Box>

      <VStack gap={0.5} align="start" flex="1" minW="0">
        <HStack gap={2} align="center">
          <Text fontSize="sm" fontWeight="medium" color="fg.default">
            {props.type === "deposit" ? "Setoran" : "Penarikan"}
          </Text>
          <Badge
            colorPalette={
              props.walletType === "transaction" ? "blue" : "orange"
            }
            variant="subtle"
            size="xs"
            borderRadius="full"
          >
            {props.walletName}
          </Badge>
        </HStack>
        <Text fontSize="xs" color="fg.muted" lineClamp={1}>
          {props.description || "Tanpa keterangan"} •{" "}
          {dayjs(props.date).format("HH:mm")}
        </Text>
      </VStack>

      <Text
        fontSize="sm"
        fontWeight="semibold"
        color={props.type === "deposit" ? "green.fg" : "red.fg"}
        flexShrink={0}
      >
        {props.type === "deposit" ? "+" : "-"}
        {formatCurrency(props.amount)}
      </Text>
    </HStack>
  );
};
