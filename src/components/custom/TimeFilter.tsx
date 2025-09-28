import {
  Box,
  HStack,
  VStack,
  Text,
  SegmentGroup,
  Icon,
  Flex,
  Separator,
} from "@chakra-ui/react";
import { LuCalendarDays, LuFilter } from "react-icons/lu";

export type TimeFilterOption = {
  value: "today" | "week" | "month" | "all";
  label: string;
  shortLabel?: string; // For responsive design
  description?: string; // For accessibility
};

type TimeFilterProps = {
  value: "today" | "week" | "month" | "all";
  onChange: (value: "today" | "week" | "month" | "all") => void;
  options?: TimeFilterOption[];
  label?: string;
  showIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "compact" | "card";
  orientation?: "horizontal" | "vertical";
  showDescription?: boolean;
  disabled?: boolean;
};

const defaultOptions: TimeFilterOption[] = [
  {
    value: "today",
    label: "Hari Ini",
    shortLabel: "Hari Ini",
    description: "Transaksi hari ini saja",
  },
  {
    value: "week",
    label: "7 Hari Terakhir",
    shortLabel: "7 Hari",
    description: "Transaksi dalam 7 hari terakhir",
  },
  {
    value: "month",
    label: "Bulan Ini",
    shortLabel: "Bulan Ini",
    description: "Transaksi bulan berjalan",
  },
  {
    value: "all",
    label: "Sepanjang Waktu",
    shortLabel: "Semua",
    description: "Seluruh riwayat transaksi",
  },
];

export const TimeFilter = ({
  value,
  onChange,
  options = defaultOptions,
  label = "Filter Periode",
  showIcon = true,
  size = "sm",
  variant = "default",
  orientation = "horizontal",
  showDescription = false,
  disabled = false,
}: TimeFilterProps) => {
  // Get the current option for enhanced display
  const currentOption = options.find((option) => option.value === value);

  // Render compact card variant
  if (variant === "card") {
    return (
      <Box
        p={4}
        bg="surface.subtle"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
        shadow="sm"
        _hover={{
          shadow: "md",
          borderColor: "brand.fg",
        }}
        transition="all 0.2s"
      >
        <VStack align="stretch" gap={3}>
          <HStack gap={2} align="center">
            <Box p={2} borderRadius="md" bg="brand.muted" color="brand.solid">
              <Icon size="sm">
                <LuFilter />
              </Icon>
            </Box>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" fontWeight="semibold" color="fg.default">
                {label}
              </Text>
              {showDescription && currentOption?.description && (
                <Text fontSize="xs" color="fg.muted" lineHeight="1.3">
                  {currentOption.description}
                </Text>
              )}
            </VStack>
          </HStack>

          <SegmentGroup.Root
            value={value}
            onValueChange={(e) =>
              !disabled && onChange(e.value as typeof value)
            }
            size={size}
            disabled={disabled}
            width="full"
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={options} />
          </SegmentGroup.Root>
        </VStack>
      </Box>
    );
  }

  // Render compact variant
  if (variant === "compact") {
    return (
      <HStack gap={2} align="center">
        {showIcon && (
          <Icon size="sm" color="brand.solid">
            <LuCalendarDays />
          </Icon>
        )}
        <SegmentGroup.Root
          value={value}
          onValueChange={(e) => !disabled && onChange(e.value as typeof value)}
          size={size}
          disabled={disabled}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={options.map((option) => ({
              ...option,
              label: option.shortLabel || option.label,
            }))}
          />
        </SegmentGroup.Root>
      </HStack>
    );
  }

  // Default variant with enhanced design
  const containerProps =
    orientation === "vertical"
      ? { as: VStack, align: "start", gap: 3 }
      : { as: HStack, align: "center", gap: 4 };

  return (
    <Flex {...containerProps}>
      {/* Enhanced Label Section */}
      <HStack gap={2.5} align="center" minW="fit-content">
        {showIcon && (
          <Box
            p={2}
            borderRadius="lg"
            color="brand.solid"
            transition="all 0.2s"
            _hover={{
              bg: "brand.muted",
              transform: "scale(1.05)",
            }}
          >
            <Icon size="sm">
              <LuCalendarDays />
            </Icon>
          </Box>
        )}
        <VStack align="start" gap={0}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="fg.default"
            letterSpacing="tight"
          >
            {label}
          </Text>
          {showDescription && currentOption?.description && (
            <Text fontSize="xs" color="fg.subtle" lineHeight="1.2">
              {currentOption.description}
            </Text>
          )}
        </VStack>
      </HStack>

      {orientation === "vertical" && (
        <Separator size="sm" colorPalette="gray" />
      )}

      <SegmentGroup.Root
        value={value}
        onValueChange={(e) => !disabled && onChange(e.value as typeof value)}
        size={size}
        disabled={disabled}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={options} />
      </SegmentGroup.Root>
    </Flex>
  );
};
