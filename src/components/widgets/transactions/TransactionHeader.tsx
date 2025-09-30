import { VStack, Heading, HStack, Badge, Text } from "@chakra-ui/react";
import { LuActivity } from "react-icons/lu";

type TransactionContainerHeaderProps = {
  label: string;
  length: number;
};

export const TransactionHeader = ({
  label,
  length,
}: TransactionContainerHeaderProps) => {
  return (
    <VStack gap={2} align="start">
      <Heading size="xl" fontWeight="bold" color="fg.default">
        {label}
      </Heading>
      <HStack gap={3} align="center">
        <Text color="fg.muted" fontSize="md">
          Total {length} transaksi
        </Text>
        <Badge
          colorPalette="brand"
          variant="subtle"
          size="sm"
          borderRadius="full"
        >
          <HStack gap={1}>
            <LuActivity size={14} />
            <Text>Aktif</Text>
          </HStack>
        </Badge>
      </HStack>
    </VStack>
  );
};
