import { TransactionType } from "@/features/transactions/transactionTypes";
import {
  Stack,
  Box,
  Popover,
  Portal,
  Text,
  FormatNumber,
  Badge,
} from "@chakra-ui/react";
import dayjs from "dayjs";

type UserTableCellProps = {
  fullname: string;
  email: string;
  phone: string;
};

const User = ({ fullname, email, phone }: UserTableCellProps) => {
  if (!fullname && !email && !phone) {
    return (
      <Text fontSize="sm" color="fg.muted">
        No user data
      </Text>
    );
  }

  return (
    <Stack gap={1}>
      <Text fontWeight="medium" fontSize="sm" lineClamp={1}>
        {fullname || "-"}
      </Text>
      <Text fontSize="xs" color="fg.muted" lineClamp={1}>
        {email}
      </Text>
    </Stack>
  );
};

type DescriptionTableCellProps = {
  description: string;
};

const Description = ({ description }: DescriptionTableCellProps) => {
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
        <Box cursor="pointer" _hover={{ bg: "bg.muted" }} rounded="sm" p={1}>
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
};

const TransactionDate = ({ date }: { date: string }) => {
  return (
    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
      {dayjs(date).format("DD MMM YYYY, HH:mm")}
    </Text>
  );
};

const Amount = ({
  amount,
  type,
}: {
  amount: number;
  type: TransactionType;
}) => {
  const isPositive = type === "deposit";

  return (
    <Text fontWeight="semibold" color={isPositive ? "brand.solid" : "red.600"}>
      <FormatNumber
        value={amount}
        style="currency"
        currency="IDR"
        signDisplay={isPositive ? "always" : "negative"}
      />
    </Text>
  );
};

export const TypeBadge = ({ type }: { type: TransactionType }) => {
  return (
    <Badge
      colorPalette={type === "deposit" ? "brand" : "red"}
      textTransform="uppercase"
    >
      {type === "deposit" ? "masuk" : "keluar"}
    </Badge>
  );
};

export const TableCell = () => {
  return <h1>Hehe</h1>;
};

TableCell.User = User;
TableCell.Description = Description;
TableCell.TransactionDate = TransactionDate;
TableCell.Amount = Amount;
TableCell.TypeBadge = TypeBadge;
