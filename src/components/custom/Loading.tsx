import { Box, Spinner, Stack, Text } from "@chakra-ui/react";

type LoadingProps = {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export const Loading = ({
  message = "Loading...",
  size = "md",
}: LoadingProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={12}
      px={4}
    >
      <Stack align="center" gap={4}>
        <Spinner size={size} colorPalette="brand" />
        <Text fontSize="sm" color="fg.muted" textAlign="center">
          {message}
        </Text>
      </Stack>
    </Box>
  );
};
