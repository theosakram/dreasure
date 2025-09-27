import { HStack, Text, SegmentGroup } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";

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
  options = defaultOptions,
  label = "Filter:",
  showIcon = true,
  size = "sm",
}: TimeFilterProps) => {
  return (
    <HStack gap={4} wrap="wrap" alignItems="center">
      <HStack gap={1} alignItems="center">
        {showIcon && <LuCalendar size={16} />}
        <Text fontSize="sm" fontWeight="medium" color="fg.muted">
          {label}
        </Text>
      </HStack>

      <SegmentGroup.Root defaultValue="all" size={size}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items cursor="pointer" items={options} />
      </SegmentGroup.Root>
    </HStack>
  );
};
