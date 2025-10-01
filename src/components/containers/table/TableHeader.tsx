import { HStack, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

type TableHeaderProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  customAddButton?: React.ReactNode;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonLabel?: string;
};

export const TableHeader = (props: TableHeaderProps) => {
  const {
    title,
    subtitle,
    description,
    customAddButton,
    showAddButton,
    onAddClick,
    addButtonLabel,
  } = props;

  return (
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
  );
};
