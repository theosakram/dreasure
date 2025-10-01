import { Box, VStack, Icon, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

interface FeatureCardProps {
  href: string;
  icon: React.ReactElement;
  title: string;
  description: string;
  isPrimary?: boolean;
}

export const HomeFeatureCard = ({
  href,
  icon,
  title,
  description,
}: FeatureCardProps) => (
  <Link href={href}>
    <Box
      display="block"
      h="full"
      minH="240px"
      bg="bg.panel"
      borderRadius="2xl"
      border="1px solid"
      borderColor={"border.muted"}
      cursor="pointer"
      transition="all 0.15s"
      _hover={{
        borderColor: "brand.emphasized",
      }}
      boxShadow="xl"
    >
      <VStack h="full" p={6} gap={5} justify="space-between" align="start">
        <VStack gap={4} align="start" flex="1">
          <Box p={3} borderRadius="xl" bg="brand.muted" color="brand.fg">
            <Icon fontSize="2xl">{icon}</Icon>
          </Box>

          <VStack gap={2} align="start">
            <Heading size="xl" color="fg.default" fontWeight="semibold">
              {title}
            </Heading>
            <Text
              fontSize="sm"
              lineHeight="1.5"
              color="fg.muted"
              textAlign="left"
            >
              {description}
            </Text>
          </VStack>
        </VStack>

        <HStack gap={2} color="brand.fg" fontWeight="medium" fontSize="sm">
          <Text>Kelola sekarang</Text>
          <Icon size="sm">
            <LuArrowRight />
          </Icon>
        </HStack>
      </VStack>
    </Box>
  </Link>
);
