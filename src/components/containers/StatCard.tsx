import {
  StatRootProps,
  Stat,
  HStack,
  Badge,
  Icon,
  FormatNumber,
  Progress,
} from "@chakra-ui/react";
import { Loader } from "../custom/Loader";

export type StatCardConfig = {
  label: string;
  value: number;
  icon: React.ElementType;
  colorPalette?: StatRootProps["colorPalette"];
  showSign?: boolean;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  showProgress?: boolean;
  progressValue?: number;
  helpText?: string;
  badge?: string;
};

type StatCardProps = StatCardConfig & {
  isLoading?: boolean;
};

export const StatCard = ({
  label,
  value,
  icon: IconComponent,
  colorPalette = "gray",
  showSign = false,
  isLoading = false,
  trend,
  showProgress = false,
  progressValue = 0,
  helpText,
  badge,
}: StatCardProps) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stat.Root
      p={3}
      bg="bg.panel"
      borderRadius="md"
      border="1px solid"
      borderColor="border.subtle"
      transition="all 0.2s"
      _hover={{
        borderColor: `${colorPalette}.emphasized`,
        shadow: "sm",
      }}
      colorPalette={colorPalette}
    >
      <HStack justify="space-between">
        <Stat.Label fontSize="sm" fontWeight="bold">
          {label}
        </Stat.Label>
        <HStack gap={2}>
          {badge && (
            <Badge
              colorPalette={colorPalette}
              variant="subtle"
              size="sm"
              borderRadius="full"
            >
              {badge}
            </Badge>
          )}
          <Icon color={`${colorPalette}.600`} boxSize={3.5}>
            <IconComponent />
          </Icon>
        </HStack>
      </HStack>

      <HStack gap={1.5} align="baseline" mt={1}>
        <Stat.ValueText
          fontSize="lg"
          fontWeight="bold"
          color={`${colorPalette}.600`}
        >
          <FormatNumber
            value={value}
            style="currency"
            currency="IDR"
            signDisplay={showSign ? "always" : "auto"}
          />
        </Stat.ValueText>

        {trend && (
          <Badge
            colorPalette={trend.isPositive !== false ? "green" : "red"}
            gap="0"
            size="sm"
          >
            {trend.isPositive !== false ? (
              <Stat.UpIndicator />
            ) : (
              <Stat.DownIndicator />
            )}
            <FormatNumber
              value={Math.abs(trend.value)}
              style="percent"
              maximumFractionDigits={1}
            />
          </Badge>
        )}
      </HStack>

      {helpText && (
        <Stat.HelpText
          mt={0.5}
          mb={showProgress ? 1 : 0}
          fontSize="sm"
          color="GrayText"
        >
          {helpText}
        </Stat.HelpText>
      )}

      {showProgress && (
        <Progress.Root value={progressValue} mt={1} size="xs">
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      )}
    </Stat.Root>
  );
};
