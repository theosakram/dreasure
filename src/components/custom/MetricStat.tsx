import {
  Stat,
  HStack,
  Box,
  FormatNumber,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type MetricStatProps = {
  label: string;
  value: number;
  icon: ReactNode;
  colorScheme: string;
  variant?: "primary" | "success" | "danger" | "neutral" | "blue";
  showSign?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

export const MetricStat = ({
  label,
  value,
  icon,
  colorScheme,
  variant = "neutral",
  showSign = false,
  onClick,
  isLoading = false,
}: MetricStatProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          cardBg: "bg.panel",
          iconBg: "brand.muted",
          iconColor: "brand.fg",
          valueColor: "brand.solid",
        };
      case "success":
        return {
          cardBg: "bg.panel",
          iconBg: "success.muted",
          iconColor: "success.fg",
          valueColor: "success.solid",
        };
      case "danger":
        return {
          cardBg: "bg.panel",
          iconBg: "red.50",
          iconColor: "red.600",
          valueColor: "red.600",
        };
      case "blue":
        return {
          cardBg: "bg.panel",
          iconBg: "blue.50",
          iconColor: "blue.600",
          valueColor: "blue.600",
        };
      default:
        return {
          cardBg: "bg.panel",
          iconBg: "bg.muted",
          iconColor: "fg.muted",
          valueColor: "fg.default",
        };
    }
  };

  const styles = getVariantStyles();

  if (isLoading) {
    return (
      <Stat.Root bg={styles.cardBg} p={5} borderRadius="xl" boxShadow="sm">
        <HStack justify="space-between" align="start" mb={3}>
          <Skeleton height="16px" width="80px" borderRadius="md" />
          <Skeleton height="32px" width="40px" borderRadius="lg" />
        </HStack>

        <Skeleton
          height="32px"
          width="120px"
          borderRadius="md"
          mb={onClick ? 4 : 0}
        />

        {onClick && <Skeleton height="32px" width="full" borderRadius="lg" />}
      </Stat.Root>
    );
  }

  return (
    <Stat.Root
      bg={styles.cardBg}
      p={5}
      borderRadius="xl"
      boxShadow="sm"
      transition="all 0.2s"
      cursor={onClick ? "pointer" : "default"}
      _hover={{
        borderColor: styles.iconColor,
        boxShadow: "lg",
      }}
    >
      <HStack justify="space-between" align="start" mb={3}>
        <Stat.Label
          textStyle="caption"
          color="fg.muted"
          fontWeight="semibold"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          {label}
        </Stat.Label>
        <Box
          p={2.5}
          bg={styles.iconBg}
          borderRadius="lg"
          color={styles.iconColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="xs"
        >
          {icon}
        </Box>
      </HStack>

      <Stat.ValueText
        textStyle="title"
        color={styles.valueColor}
        lineHeight="1.1"
        mb={onClick ? 4 : 0}
        fontWeight="bold"
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
          variant="subtle"
          colorPalette={colorScheme}
          w="full"
          onClick={onClick}
          fontWeight="medium"
          borderRadius="lg"
        >
          Lihat Detail
        </Button>
      )}
    </Stat.Root>
  );
};
