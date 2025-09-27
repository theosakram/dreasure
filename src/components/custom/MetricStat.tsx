import { Stat, HStack, Box, FormatNumber, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type MetricStatProps = {
  label: string;
  value: number;
  icon: ReactNode;
  colorScheme: string;
  showSign?: boolean;
  onClick?: () => void;
};

export const MetricStat = ({
  label,
  value,
  icon,
  colorScheme,
  showSign = false,
  onClick,
}: MetricStatProps) => (
  <Stat.Root borderWidth="1px" p={4} rounded="md" bg="bg.surface">
    <HStack justify="space-between" align="start" mb={2}>
      <Stat.Label fontSize="xs" color="fg.muted" fontWeight="medium">
        {label}
      </Stat.Label>
      <Box
        p={1.5}
        bg={`${colorScheme}.50`}
        rounded="md"
        color={`${colorScheme}.600`}
      >
        {icon}
      </Box>
    </HStack>
    <Stat.ValueText
      fontSize="lg"
      fontWeight="bold"
      color={`${colorScheme}.600`}
      lineHeight="1"
      mb={3}
    >
      <FormatNumber
        value={value}
        style="currency"
        currency="IDR"
        signDisplay={showSign ? "always" : "auto"}
      />
    </Stat.ValueText>
    {onClick && (
      <Button
        size="sm"
        variant="surface"
        colorPalette={colorScheme}
        w="full"
        onClick={onClick}
      >
        Detail
      </Button>
    )}
  </Stat.Root>
);
