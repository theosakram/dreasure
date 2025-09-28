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

const FeatureCard = ({
  href,
  icon,
  title,
  description,
  isPrimary = false,
}: FeatureCardProps) => (
  <Link href={href}>
    <Box
      display="block"
      position="relative"
      h="full"
      minH="280px"
      bg={isPrimary ? "brand.solid" : "bg.panel"}
      borderRadius="3xl"
      border="2px solid"
      borderColor={isPrimary ? "brand.600" : "border.muted"}
      overflow="hidden"
      cursor="pointer"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-4px) scale(1.01)",
        shadow: "2xl",
        borderColor: isPrimary ? "brand.400" : "brand.emphasized",
      }}
      _active={{
        transform: "translateY(-4px) scale(1.01)",
      }}
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={isPrimary ? 0.1 : 0.05}
        bgGradient={
          isPrimary
            ? "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3), transparent 50%)"
            : "radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1), transparent 50%)"
        }
      />

      {/* Content */}
      <VStack
        position="relative"
        h="full"
        p={8}
        justify="space-between"
        align="start"
        zIndex={1}
      >
        {/* Icon Section */}
        <VStack gap={6} align="start" flex="1" justify="center">
          <Box
            p={4}
            borderRadius="2xl"
            bg={isPrimary ? "rgba(255,255,255,0.15)" : "brand.muted"}
            border="2px solid"
            borderColor={
              isPrimary ? "rgba(255,255,255,0.2)" : "brand.emphasized"
            }
            backdropBlur="10px"
          >
            <Icon
              size="2xl"
              color={isPrimary ? "white" : "brand.solid"}
              filter={
                isPrimary ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" : "none"
              }
            >
              {icon}
            </Icon>
          </Box>

          <VStack gap={3} align="start">
            <Heading
              size="xl"
              color={isPrimary ? "white" : "fg.default"}
              fontWeight="bold"
              letterSpacing="tight"
            >
              {title}
            </Heading>
            <Text
              fontSize="md"
              lineHeight="1.6"
              color={isPrimary ? "rgba(255,255,255,0.9)" : "fg.muted"}
              maxW="280px"
              textAlign="left"
            >
              {description}
            </Text>
          </VStack>
        </VStack>

        {/* CTA */}
        <HStack
          gap={3}
          color={isPrimary ? "white" : "brand.solid"}
          fontWeight="semibold"
          transition="all 0.3s"
          _groupHover={{ gap: 4 }}
        >
          <Text fontSize="lg">
            {isPrimary ? "Mulai Kelola" : "Kelola Sekarang"}
          </Text>
          <Icon
            size="lg"
            transition="transform 0.3s"
            _groupHover={{ transform: "translateX(4px)" }}
          >
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
  <HStack
    gap={3}
    opacity={0.8}
    transition="opacity 0.3s"
    _hover={{ opacity: 1 }}
  >
    <Box
      p={2}
      borderRadius="lg"
      bg="success.emphasized"
      borderColor="success.emphasized"
    >
      <Icon size="md" color="success.solid">
        {icon}
      </Icon>
    </Box>
    <Text fontSize="md" fontWeight="medium" color="fg.muted">
      {label}
    </Text>
  </HStack>
);

export default function Home() {
  return (
    <Box
      h="100vh"
      w="100vw"
      bg="bg.canvas"
      overflow="hidden"
      position="relative"
    >
      {/* Background Elements */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="brand.muted"
        opacity={0.1}
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="15%"
        left="5%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="sage.muted"
        opacity={0.1}
        filter="blur(40px)"
        pointerEvents="none"
      />

      <Container maxW="7xl" h="full" py={0}>
        <Center h="full">
          <VStack gap={10} w="full" textAlign="center">
            {/* Brand Header */}
            <VStack gap={6}>
              {/* Logo & Brand */}
              <VStack gap={4} align="center">
                <Box
                  p={4}
                  borderRadius="3xl"
                  bg="brand.muted"
                  border="3px solid"
                  borderColor="brand.emphasized"
                  shadow="lg"
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    borderRadius: "3xl",
                    bg: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(34,197,94,0.1))",
                    zIndex: -1,
                  }}
                >
                  <Icon size="2xl" color="brand.solid">
                    <TbMoneybag />
                  </Icon>
                </Box>

                <VStack gap={2}>
                  <Heading
                    size="4xl"
                    color="fg.default"
                    fontWeight="800"
                    letterSpacing="tight"
                    bgGradient="linear-gradient(135deg, token(colors.brand.600), token(colors.brand.800))"
                    bgClip="text"
                  >
                    Dreasury
                  </Heading>
                  <Text
                    fontSize="xl"
                    color="fg.muted"
                    fontWeight="500"
                    letterSpacing="wide"
                    textTransform="uppercase"
                  >
                    Aplikasi Manajemen Keuangan Organisasi
                  </Text>
                </VStack>
              </VStack>

              {/* Trust Indicators */}
              <HStack gap={8} wrap="wrap" justify="center" pt={2}>
                <TrustIndicator icon={<LuShield />} label="Aman & Terpercaya" />
                <TrustIndicator
                  icon={<LuActivity />}
                  label="Real-time Reporting"
                />
                <TrustIndicator icon={<LuUsers />} label="Multi-user Access" />
                <TrustIndicator
                  icon={<LuTrendingUp />}
                  label="Analytics Dashboard"
                />
              </HStack>
            </VStack>

            {/* Main Features */}
            <VStack gap={6} w="full" maxW="6xl">
              <Heading
                size="2xl"
                color="fg.default"
                fontWeight="600"
                letterSpacing="tight"
              >
                Feature yang tersedia
              </Heading>

              {/* Feature Cards Grid */}
              <Stack
                direction={{ base: "column", xl: "row" }}
                gap={8}
                w="full"
                justify="center"
                align="stretch"
              >
                <Box flex="1" maxW={{ base: "full", xl: "400px" }}>
                  <FeatureCard
                    href="/cash"
                    icon={<LuWallet />}
                    title="Uang Kas"
                    description="Kelola kas harian organisasi dengan pencatatan transaksi yang akurat dan laporan real-time"
                    isPrimary={true}
                  />
                </Box>

                <Box flex="1" maxW={{ base: "full", xl: "400px" }}>
                  <FeatureCard
                    href="/revolving"
                    icon={<LuRefreshCw />}
                    title="Dana Bergulir"
                    description="Sistem pinjaman dengan manajemen cicilan, dan notifikasi otomatis"
                  />
                </Box>
              </Stack>
            </VStack>

            {/* Auth Actions */}
            <HStack gap={4} pt={4}>
              <Button
                asChild
                size="lg"
                variant="solid"
                colorPalette="brand"
                px={8}
                py={6}
                borderRadius="2xl"
                shadow="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "xl",
                }}
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
