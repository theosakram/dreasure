import { Box, HStack, Text, Button, Separator } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components/custom/Table";
import { Loading } from "@/components/custom/Loading";
import { Empty } from "@/components/custom/Empty";
import { Error } from "@/components/custom/Error";
import { LuPlus } from "react-icons/lu";

type TableContainerProps<T extends Record<string, unknown>> = {
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
};

export const TableContainer = <T extends Record<string, unknown>>({
  data = [],
  columns,
  isLoading = false,
  isError = false,
  error,
  title,
  subtitle,
  addButtonLabel = "Add New",
  onAddClick,
  showAddButton = true,
  variant = "line",
  size = "md",
  striped = false,
  interactive = false,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  errorTitle,
  errorDescription,
  onRetry,
  loadingMessage,
}: TableContainerProps<T>) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loading message={loadingMessage} />;
    }

    if (isError) {
      return (
        <Error
          title={errorTitle}
          description={errorDescription || error}
          onRetry={onRetry}
        />
      );
    }

    if (!data || data.length === 0) {
      return (
        <Empty
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction || onAddClick}
        />
      );
    }

    return (
      <Table<T>
        data={data}
        columns={columns}
        variant={variant}
        size={size}
        striped={striped}
        interactive={interactive}
      />
    );
  };

  return (
    <Box>
      {/* Header Section */}
      {(title || subtitle || showAddButton) && (
        <>
          <HStack justify="space-between" align="start" mb={4}>
            <Box>
              {title && (
                <Text fontSize="lg" fontWeight="semibold" color="fg.default">
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text fontSize="sm" color="fg.muted">
                  {subtitle}
                </Text>
              )}
            </Box>

            {showAddButton && onAddClick && (
              <Button
                size="xs"
                colorPalette="brand"
                variant="solid"
                onClick={onAddClick}
              >
                <LuPlus />
                {addButtonLabel}
              </Button>
            )}
          </HStack>
          <Separator mb={4} />
        </>
      )}

      {/* Table Container */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="bg.surface"
      >
        {renderContent()}
      </Box>
    </Box>
  );
};
