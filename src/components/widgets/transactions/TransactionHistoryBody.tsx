import { Card, VStack, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type TransactionContainerHistoryBodyProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};

export const TransactionHistoryBody = ({
  children,
  title,
  subtitle,
}: TransactionContainerHistoryBodyProps) => {
  return (
    <Card.Root
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.subtle"
    >
      <Card.Body p={6}>
        <VStack gap={6} align="stretch">
          <VStack gap={1} align="start">
            <Heading size="md" fontWeight="semibold" color="fg.default">
              {title || "Riwayat Transaksi"}
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              {subtitle || "Aktivitas terbaru dalam kas"}
            </Text>
          </VStack>

          {children}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
