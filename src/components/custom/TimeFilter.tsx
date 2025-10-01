"use client";

import { useShallowPush } from "@/utils/helpers/hooks/useShallowPush";
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
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LuCalendarDays, LuFilter } from "react-icons/lu";
import { Loader } from "./Loader";

export type TimeFilterOption = {
  value: "today" | "week" | "month" | "all";
  label: string;
  shortLabel?: string; // For responsive design
  description?: string; // For accessibility
};

type TimeFilterProps = {
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

// Main TimeFilter component that uses useSearchParams
const TimeFilterContent = ({
  options = defaultOptions,
  label = "Filter Periode",
  showIcon = true,
  size = "sm",
  variant = "default",
  orientation = "horizontal",
  showDescription = false,
  disabled = false,
}: TimeFilterProps) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") as TimeFilterOption["value"];
  const currentOption = options.find((option) => option.value === filter);

  const { shallowPush } = useShallowPush({ type: "replace" });

  if (variant === "card") {
    return (
      <Box
        p={5}
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
        transition="all 0.15s"
        _hover={{
          borderColor: "border.emphasized",
          shadow: "sm",
        }}
      >
        <VStack align="stretch" gap={3}>
          <HStack gap={2.5} align="center">
            <Box p={2} borderRadius="lg" bg="brand.muted" color="brand.fg">
              <Icon size="sm">
                <LuFilter />
              </Icon>
            </Box>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" fontWeight="semibold" color="fg.default">
                {label}
              </Text>
              {showDescription && currentOption?.description && (
                <Text fontSize="xs" color="fg.muted">
                  {currentOption.description}
                </Text>
              )}
            </VStack>
          </HStack>

          <SegmentGroup.Root
            value={filter || "all"}
            onValueChange={(e) =>
              !disabled && shallowPush({ filter: e.value || "all" })
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

  if (variant === "compact") {
    return (
      <HStack gap={2.5} align="center">
        {showIcon && (
          <Icon size="sm" color="brand.fg">
            <LuCalendarDays />
          </Icon>
        )}
        <SegmentGroup.Root
          value={filter || "all"}
          onValueChange={(e) =>
            !disabled && shallowPush({ filter: e.value || "all" })
          }
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

  const containerProps =
    orientation === "vertical"
      ? { as: VStack, align: "start", gap: 3 }
      : { as: HStack, align: "center", gap: 4 };

  return (
    <Flex {...containerProps}>
      {/* Label Section */}
      <HStack gap={2.5} align="center" minW="fit-content">
        {showIcon && (
          <Box p={2} borderRadius="lg" bg="brand.muted" color="brand.fg">
            <Icon size="sm">
              <LuCalendarDays />
            </Icon>
          </Box>
        )}
        <VStack align="start" gap={0}>
          <Text fontSize="sm" fontWeight="semibold" color="fg.default">
            {label}
          </Text>
          {showDescription && currentOption?.description && (
            <Text fontSize="xs" color="fg.muted">
              {currentOption.description}
            </Text>
          )}
        </VStack>
      </HStack>

      {orientation === "vertical" && <Separator />}

      <SegmentGroup.Root
        value={filter || "all"}
        onValueChange={(e) =>
          !disabled && shallowPush({ filter: e.value || "all" })
        }
        size={size}
        disabled={disabled}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items cursor="pointer" items={options} />
      </SegmentGroup.Root>
    </Flex>
  );
};

export const TimeFilter = (props: TimeFilterProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <TimeFilterContent {...props} />
    </Suspense>
  );
};
