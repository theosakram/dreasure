import { EmptyState, VStack, Button } from "@chakra-ui/react";
import { LuInbox, LuPlus } from "react-icons/lu";

type EmptyProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export const Empty = ({
  title = "No data found",
  description = "There are no items to display at the moment.",
  actionLabel,
  onAction,
  icon = <LuInbox />,
  size = "md",
}: EmptyProps) => {
  return (
    <EmptyState.Root size={size}>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon}</EmptyState.Indicator>

        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>

        {actionLabel && onAction && (
          <Button
            size="sm"
            variant="outline"
            colorPalette="brand"
            onClick={onAction}
          >
            <LuPlus size={16} />
            {actionLabel}
          </Button>
        )}
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
