import { Box, HStack, Text, SegmentGroup, Icon } from "@chakra-ui/react";
import { LuCalendarDays } from "react-icons/lu";

type TimeFilterOption = {
  value: "today" | "week" | "month" | "all";
  label: string;
};

type TimeFilterProps = {
  value: "today" | "week" | "month" | "all";
  onChange: (value: "today" | "week" | "month" | "all") => void;
  options?: TimeFilterOption[];
  label?: string;
  showIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
};

const defaultOptions: TimeFilterOption[] = [
  { value: "today", label: "Hari Ini" },
  { value: "week", label: "7 Hari Terakhir" },
  { value: "month", label: "Bulan Ini" },
  { value: "all", label: "Sepanjang Waktu" },
];

export const TimeFilter = ({
  value,
  onChange,
  options = defaultOptions,
  label = "Periode",
  showIcon = true,
  size = "sm",
}: TimeFilterProps) => {
  return (
    <HStack gap={3} align="center">
      {/* Label Section */}
      <HStack gap={2} align="center">
        {showIcon && (
          <Box p={1.5} bg="brand.50" borderRadius="md" color="brand.solid">
            <Icon size="xs">
              <LuCalendarDays />
            </Icon>
          </Box>
        )}
        <Text fontSize="sm" fontWeight="medium" color="fg.default">
          {label}
        </Text>
      </HStack>

      {/* Segment Control */}
      <SegmentGroup.Root
        value={value}
        onValueChange={(e) => onChange(e.value as typeof value)}
        size={size}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={options} />
      </SegmentGroup.Root>
    </HStack>
  );
};
