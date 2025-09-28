import { useGetProfileById } from "@/features/profiles/profileHooks";
import {
  Box,
  Card,
  HStack,
  Skeleton,
  VStack,
  Avatar,
  Badge,
  Button,
  Icon,
  Text,
  Float,
  Circle,
  Group,
  Separator,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import {
  LuPencil,
  LuEllipsis,
  LuMail,
  LuPhone,
  LuCalendar,
  LuUser,
  LuShield,
  LuTrendingUp,
} from "react-icons/lu";

export const ProfileHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading } = useGetProfileById(id);

  if (isLoading) {
    return (
      <Card.Root
        variant="subtle"
        layerStyle="fill.surface"
        borderRadius="2xl"
        overflow="hidden"
        bg="bg.panel"
      >
        <Card.Body p={0}>
          <Box
            bgGradient="to-r"
            gradientFrom="blue.500/20"
            gradientTo="purple.500/20"
            p={6}
          >
            <HStack gap={5} align="start">
              <Skeleton boxSize="16" borderRadius="2xl" />
              <VStack align="start" gap={2} flex="1" pt={2}>
                <Skeleton height="6" width="200px" borderRadius="md" />
                <Skeleton height="4" width="120px" borderRadius="md" />
                <HStack gap={3} mt={2}>
                  <Skeleton height="3" width="80px" borderRadius="md" />
                  <Skeleton height="3" width="100px" borderRadius="md" />
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Card.Root
      variant="subtle"
      layerStyle="fill.surface"
      borderRadius="2xl"
      overflow="hidden"
      bg="bg.panel"
      boxShadow="lg"
      border="1px solid"
      borderColor="border.muted"
      transition="all 0.2s ease-in-out"
    >
      <Card.Body p={0}>
        {/* Header with gradient background */}
        <Box
          bgGradient="to-r"
          gradientFrom="blue.500/10"
          gradientVia="purple.500/10"
          gradientTo="teal.500/10"
          p={6}
          position="relative"
          _dark={{
            gradientFrom: "blue.400/20",
            gradientVia: "purple.400/20",
            gradientTo: "teal.400/20",
          }}
        >
          {/* Decorative elements */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="32"
            h="32"
            bg="blue.500/5"
            borderRadius="full"
            transform="translate(16px, -16px)"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w="24"
            h="24"
            bg="purple.500/5"
            borderRadius="full"
            transform="translate(-12px, 12px)"
          />

          <HStack gap={5} align="start" position="relative">
            {/* Enhanced Avatar */}
            <Avatar.Root colorPalette="green" variant="subtle" size="2xl">
              <Avatar.Fallback name={profile?.fullname} />
              <Float placement="bottom-end" offsetX="2" offsetY="2">
                <Circle
                  bg="green.500"
                  size="8px"
                  outline="0.1em solid"
                  outlineColor="bg"
                />
              </Float>
            </Avatar.Root>

            {/* Profile Info */}
            <VStack align="start" gap={2} flex="1" pt={1}>
              <HStack gap={3} align="center" w="full">
                <Text
                  textStyle="2xl"
                  fontWeight="bold"
                  color="fg"
                  lineHeight="1.2"
                  letterSpacing="tight"
                >
                  {profile?.fullname}
                </Text>
                <Badge
                  colorPalette="green"
                  variant="solid"
                  size="sm"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight="medium"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <LuShield size={12} />
                  Aktif
                </Badge>
              </HStack>

              {/* ID and Join Date */}
              <HStack gap={4} align="center" opacity={0.8}>
                <HStack gap={1.5}>
                  <Icon color="fg.muted" fontSize="sm">
                    <LuUser />
                  </Icon>
                  <Text
                    color="fg.muted"
                    fontSize="sm"
                    fontFamily="mono"
                    fontWeight="medium"
                  >
                    #{profile?.id.slice(0, 8).toUpperCase()}
                  </Text>
                </HStack>
                <Separator orientation="vertical" h="4" />
                <HStack gap={1.5}>
                  <Icon color="fg.muted" fontSize="sm">
                    <LuCalendar />
                  </Icon>
                  <Text color="fg.muted" fontSize="sm">
                    Bergabung {dayjs(profile?.created_at).format("MMM YYYY")}
                  </Text>
                </HStack>
              </HStack>

              {/* Contact Information */}
              <Group gap={6} mt={3}>
                <HStack gap={2} minW="0">
                  <Circle bg="blue.100" size="8" color="blue.600">
                    <LuMail size={14} />
                  </Circle>
                  <VStack gap={0} align="start" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Email
                    </Text>
                    <Text
                      fontSize="sm"
                      color="fg"
                      truncate
                      maxW="200px"
                      fontWeight="medium"
                    >
                      {profile?.email || "Tidak ada"}
                    </Text>
                  </VStack>
                </HStack>

                <HStack gap={2} minW="0">
                  <Circle bg="green.100" size="8" color="green.600">
                    <LuPhone size={14} />
                  </Circle>
                  <VStack gap={0} align="start" minW="0">
                    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
                      Telepon
                    </Text>
                    <Text
                      fontSize="sm"
                      color="fg"
                      truncate
                      maxW="150px"
                      fontWeight="medium"
                    >
                      {profile?.phone || "Tidak ada"}
                    </Text>
                  </VStack>
                </HStack>
              </Group>
            </VStack>

            {/* Action Buttons */}
            <VStack gap={2} align="end">
              <Group gap={2}>
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="blue"
                  borderRadius="xl"
                  px={4}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <LuPencil size={16} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="surface"
                  borderRadius="xl"
                  px={3}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  <LuEllipsis size={16} />
                </Button>
              </Group>

              {/* Quick Stats */}
              <HStack gap={4} mt={4} opacity={0.8}>
                <VStack gap={0} align="center">
                  <Text fontSize="lg" fontWeight="bold" color="blue.500">
                    24
                  </Text>
                  <Text fontSize="xs" color="fg.muted" textAlign="center">
                    Transaksi
                  </Text>
                </VStack>
                <VStack gap={0} align="center">
                  <Text fontSize="lg" fontWeight="bold" color="green.500">
                    98%
                  </Text>
                  <Text fontSize="xs" color="fg.muted" textAlign="center">
                    Score
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Bottom Section with Activity Indicator */}
        <Box px={6} py={4} bg="bg.subtle">
          <HStack justify="space-between" align="center">
            <HStack gap={3}>
              <Circle bg="green.100" size="6" color="green.600">
                <LuTrendingUp size={12} />
              </Circle>
              <Text fontSize="sm" color="fg.muted">
                Aktif dalam 7 hari terakhir
              </Text>
            </HStack>
            <Text fontSize="xs" color="fg.muted" opacity={0.7}>
              Terakhir aktif: {dayjs().format("DD MMM, HH:mm")}
            </Text>
          </HStack>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
