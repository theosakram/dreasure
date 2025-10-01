import { HStack, Box, Icon, Text } from "@chakra-ui/react";

export const TrustIndicator = ({
  icon,
  label,
}: {
  icon: React.ReactElement;
  label: string;
}) => (
  <HStack gap={2}>
    <Box p={1.5} borderRadius="md" bg="brand.muted" color="brand.fg">
      <Icon fontSize="sm">{icon}</Icon>
    </Box>
    <Text fontSize="sm" fontWeight="medium" color="fg.muted">
      {label}
    </Text>
  </HStack>
);
