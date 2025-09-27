import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { LuX, LuRefreshCw } from "react-icons/lu";

type ErrorProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: React.ReactNode;
};

export const Error = ({
  title = "Something went wrong",
  description = "We encountered an error while loading the data. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  icon = <LuX size={32} />,
}: ErrorProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={16}
      px={4}
    >
      <Stack align="center" gap={4} maxW="sm" textAlign="center">
        <Box color="red.500" opacity={0.8}>
          {icon}
        </Box>

        <Stack gap={2}>
          <Text fontSize="lg" fontWeight="semibold" color="fg.default">
            {title}
          </Text>
          <Text fontSize="sm" color="fg.muted" lineHeight="1.6">
            {description}
          </Text>
        </Stack>

        {onRetry && (
          <Button
            size="sm"
            variant="outline"
            colorPalette="red"
            onClick={onRetry}
          >
            <LuRefreshCw size={16} />
            {retryLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
