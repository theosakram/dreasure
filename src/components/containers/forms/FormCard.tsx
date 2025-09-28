import { HStack, Box, Icon, VStack, Badge, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type FormCardHeaderProps = {
  icon: ReactNode;
  title: string;
  description: string;
  isRequired?: boolean;
  badgeText?: string;
  badgeColorPalette?: string;
  badgeVariant?: "solid" | "outline";
  iconBg?: string;
  iconColor?: string;
};

export const FormCardHeader = ({
  icon,
  title,
  description,
  isRequired = false,
  badgeText = "Wajib",
  badgeColorPalette = "red",
  badgeVariant = "solid",
  iconBg = "brand.subtle",
  iconColor = "brand.solid",
}: FormCardHeaderProps) => (
  <HStack gap={3} mb={3}>
    <Box p={2} borderRadius="lg" bg={iconBg} color={iconColor}>
      <Icon size="sm">{icon}</Icon>
    </Box>
    <VStack align="start" gap={0}>
      <HStack gap={1}>
        <Text fontSize="sm" fontWeight="semibold" color="fg.default">
          {title}
        </Text>
        {(isRequired || badgeText === "Opsional") && (
          <Badge
            size="xs"
            colorPalette={badgeColorPalette}
            variant={badgeVariant}
          >
            {badgeText}
          </Badge>
        )}
      </HStack>
      <Text fontSize="xs" color="fg.muted">
        {description}
      </Text>
    </VStack>
  </HStack>
);

type FormCardProps = {
  children: ReactNode;
  hoverBorderColor?: string;
};

export const FormCard = ({
  children,
  hoverBorderColor = "brand.fg",
}: FormCardProps) => (
  <Box
    p={4}
    borderRadius="xl"
    border="1px solid"
    borderColor="border.subtle"
    bg="surface.subtle"
    transition="all 0.2s"
    _hover={{
      borderColor: hoverBorderColor,
      shadow: "sm",
    }}
  >
    {children}
  </Box>
);
