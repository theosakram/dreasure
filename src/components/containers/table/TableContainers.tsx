import { Box, VStack } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/custom/Table";
import { Loading } from "@/components/custom/Loading";
import { Empty } from "@/components/custom/Empty";
import { Error } from "@/components/custom/Error";
import { Scroll } from "../../custom/Scroll";
import { TablePagination } from "./TablePagination";
import { TableHeader } from "./TableHeader";

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
      <Scroll scrollMaxH={scrollMaxH}>
        <Table<T>
          data={data}
          columns={columns}
          variant={variant}
          size={size}
          striped={striped}
          interactive={interactive}
        />
      </Scroll>
    );
  };

  return (
    <VStack gap={5} align="stretch">
      {(title || subtitle || description || showAddButton) && (
        <TableHeader
          title={title}
          subtitle={subtitle}
          description={description}
          customAddButton={customAddButton}
          showAddButton={showAddButton}
          onAddClick={onAddClick}
          addButtonLabel={addButtonLabel}
        />
      )}

      <Box {...containerStyles}>{renderContent()}</Box>

      {pagination && (
        <TablePagination
          total={pagination.total}
          currentPage={pagination.currentPage}
          onPageChange={pagination.onPageChange}
          pageSize={pagination.pageSize}
          totalData={data.length}
        />
      )}
    </VStack>
  );
};
