import {
  Button,
  Heading,
  Box,
  Text,
  HStack,
  VStack,
  Icon,
  Container,
  Center,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuWallet,
  LuRefreshCw,
  LuArrowRight,
  LuShield,
  LuActivity,
  LuUsers,
  LuTrendingUp,
} from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";

// Hero Feature Card Component
interface FeatureCardProps {
  href: string;
  icon: React.ReactElement;
  title: string;
  description: string;
  isPrimary?: boolean;
}

const FeatureCard = ({ href, icon, title, description }: FeatureCardProps) => (
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

// Trust Indicator Component
const TrustIndicator = ({
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

export default function Home() {
  return (
    <Box h="100vh" w="100vw" bg="bg.canvas" overflow="hidden">
      <Container maxW="7xl" h="full" py={0}>
        <Center h="full">
          <VStack gap={10} w="full" textAlign="center">
            {/* Brand Header */}
            <VStack gap={5}>
              <VStack gap={3} align="center">
                <Box p={4} borderRadius="2xl" bg="brand.muted" color="brand.fg">
                  <Icon fontSize="4xl">
                    <TbMoneybag />
                  </Icon>
                </Box>

                <VStack gap={1}>
                  <Heading size="4xl" color="fg.default" fontWeight="bold">
                    Dreasury
                  </Heading>
                  <Text fontSize="md" color="fg.muted" fontWeight="medium">
                    Aplikasi Manajemen Keuangan Organisasi
                  </Text>
                </VStack>
              </VStack>

              {/* Trust Indicators */}
              <HStack gap={6} wrap="wrap" justify="center" pt={1}>
                <TrustIndicator icon={<LuShield />} label="Aman & Terpercaya" />
                <TrustIndicator icon={<LuActivity />} label="Real-time" />
                <TrustIndicator icon={<LuUsers />} label="Multi-user" />
                <TrustIndicator icon={<LuTrendingUp />} label="Analytics" />
              </HStack>
            </VStack>

            {/* Main Features */}
            <VStack gap={5} w="full" maxW="5xl">
              <Heading size="xl" color="fg.default" fontWeight="semibold">
                Feature yang tersedia
              </Heading>

              {/* Feature Cards Grid */}
              <Stack
                direction={{ base: "column", xl: "row" }}
                gap={5}
                w="full"
                justify="center"
                align="stretch"
              >
                <Box flex="1" maxW={{ base: "full", xl: "360px" }}>
                  <FeatureCard
                    href="/login"
                    icon={<LuWallet />}
                    title="Uang Kas"
                    description="Kelola kas harian organisasi dengan pencatatan transaksi yang akurat dan laporan real-time"
                    isPrimary={true}
                  />
                </Box>

                <Box flex="1" maxW={{ base: "full", xl: "360px" }}>
                  <FeatureCard
                    href="/login"
                    icon={<LuRefreshCw />}
                    title="Dana Bergulir"
                    description="Sistem pinjaman dengan manajemen cicilan dan notifikasi otomatis"
                  />
                </Box>
              </Stack>
            </VStack>

            {/* Auth Actions */}
            <HStack gap={4} pt={3}>
              <Button
                asChild
                size="lg"
                variant="solid"
                colorPalette="brand"
                borderRadius="xl"
              >
                <Link href="/login">Masuk</Link>
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
}
