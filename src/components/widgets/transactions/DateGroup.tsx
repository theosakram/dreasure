import { HStack, Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

const getDateLabel = (date: string): string => {
  const target = dayjs(date);
  const now = dayjs();
  if (now.isSame(target, "day")) return "Hari ini";
  if (now.subtract(1, "day").isSame(target, "day")) return "Kemarin";
  return target.format("DD MMMM YYYY");
};

export const DateHeader = ({
  date,
  count,
}: {
  date: string;
  count: number;
}) => (
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
