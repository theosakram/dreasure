import {
  Box,
  HStack,
  Text,
  Button,
  ScrollArea,
  IconButton,
  Pagination,
  Flex,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/custom/Table";
import { Loading } from "@/components/custom/Loading";
import { Empty } from "@/components/custom/Empty";
import { Error } from "@/components/custom/Error";
import { LuPlus } from "react-icons/lu";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export type TableContainerProps<T extends Record<string, unknown>> = {
  // Table props
  data?: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];

  // State props
  isLoading?: boolean;
  isError?: boolean;
  error?: string;

  // Header props
  title?: string;
  subtitle?: string;
  description?: string;

  // Add button props
  addButtonLabel?: string;
  onAddClick?: () => void;
  showAddButton?: boolean;

  // Table styling
  variant?: "line" | "outline";
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  interactive?: boolean;

  // Empty state props
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;

  // Error state props
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;

  // Loading props
  loadingMessage?: string;
  scrollMaxH?: string;

  // Container styling
  containerVariant?: "elevated" | "outlined" | "ghost";

  customAddButton?: React.ReactNode;

  pagination?: {
    total: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
};

export const TableContainer = <T extends Record<string, unknown>>({
  data = [],
  columns,
  isLoading = false,
  isError = false,
  error,
  title,
  subtitle,
  description,
  addButtonLabel = "Tambah Baru",
  onAddClick,
  showAddButton = true,
  variant = "line",
  size = "md",
  striped = false,
  interactive = true,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  errorTitle,
  errorDescription,
  onRetry,
  loadingMessage,
  scrollMaxH = "600px",
  containerVariant = "elevated",
  customAddButton,
  pagination,
}: TableContainerProps<T>) => {
  // Get container styles based on variant
  const getContainerStyles = () => {
    switch (containerVariant) {
      case "elevated":
        return {
          bg: "bg.panel",
          borderRadius: "xl",
          border: "1px solid",
          borderColor: "border.subtle",
          p: 0,
          overflow: "hidden",
        };
      case "outlined":
        return {
          bg: "bg.panel",
          borderRadius: "xl",
          border: "1px solid",
          borderColor: "border.subtle",
          p: 0,
          overflow: "hidden",
        };
      case "ghost":
        return {
          bg: "transparent",
          border: "none",
          p: 0,
          overflow: "hidden",
        };
      default:
        return {
          bg: "bg.panel",
          borderRadius: "xl",
          border: "1px solid",
          borderColor: "border.subtle",
          p: 0,
          overflow: "hidden",
        };
    }
  };

  const containerStyles = getContainerStyles();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box p={8}>
          <Loading message={loadingMessage} />
        </Box>
      );
    }

    if (isError) {
      return (
        <Box p={8}>
          <Error
            title={errorTitle}
            description={errorDescription || error}
            onRetry={onRetry}
          />
        </Box>
      );
    }

    if (!data || data.length === 0) {
      return (
        <Box p={8}>
          <Empty
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction || onAddClick}
          />
        </Box>
      );
    }

    return (
      <ScrollArea.Root maxH={scrollMaxH}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            <Table<T>
              data={data}
              columns={columns}
              variant={variant}
              size={size}
              striped={striped}
              interactive={interactive}
            />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb bg="border.emphasized" borderRadius="sm" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    );
  };

  return (
    <VStack gap={5} align="stretch">
      {/* Header Section */}
      {(title || subtitle || description || showAddButton) && (
        <HStack justify="space-between" align="start">
          <VStack gap={1} align="start" flex={1}>
            {title && (
              <Heading size="lg" fontWeight="semibold" color="fg.default">
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text fontSize="sm" color="fg.muted">
                {subtitle}
              </Text>
            )}
            {description && (
              <Text fontSize="sm" color="fg.muted">
                {description}
              </Text>
            )}
          </VStack>

          {customAddButton}

          {showAddButton && onAddClick && !customAddButton && (
            <Button
              size="sm"
              colorPalette="brand"
              variant="solid"
              onClick={onAddClick}
              borderRadius="lg"
            >
              <LuPlus size={16} />
              {addButtonLabel}
            </Button>
          )}
        </HStack>
      )}

      <Box {...containerStyles}>{renderContent()}</Box>

      {pagination && (
        <Flex justify="space-between" align="center" pt={2}>
          <Text fontSize="xs" color="fg.muted">
            Menampilkan {data.length} dari {pagination.total} data
          </Text>

          <Pagination.Root
            count={pagination.total}
            pageSize={10}
            defaultPage={1}
          >
            <HStack gap={2}>
              <Pagination.PrevTrigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  borderRadius="lg"
                  _hover={{
                    bg: "bg.muted",
                    borderColor: "border.emphasized",
                  }}
                >
                  <HiChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Box
                px={3}
                py={2}
                bg="bg.subtle"
                borderRadius="lg"
                border="1px solid"
                borderColor="border.muted"
              >
                <Pagination.PageText
                  textStyle="caption"
                  fontWeight="medium"
                  color="fg.default"
                />
              </Box>

              <Pagination.NextTrigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  borderRadius="lg"
                  _hover={{
                    bg: "bg.muted",
                    borderColor: "border.emphasized",
                  }}
                >
                  <HiChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </HStack>
          </Pagination.Root>
        </Flex>
      )}
    </VStack>
  );
};
