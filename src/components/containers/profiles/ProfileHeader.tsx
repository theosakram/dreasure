import { useGetProfileById } from "@/features/profiles/profileHooks";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import {
  HStack,
  Skeleton,
  VStack,
  Avatar,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { LuEllipsis, LuMail, LuPhone } from "react-icons/lu";

export const ProfileHeader = () => {
  const { userId } = useGetIdsFromParam();
  const { data: profile, isLoading } = useGetProfileById(userId);

  if (isLoading) {
    return (
      <HStack
        gap={4}
        p={4}
        bg="bg.panel"
        borderRadius="xl"
        border="1px solid"
        borderColor="border.subtle"
      >
        <Skeleton boxSize="12" borderRadius="xl" />
        <VStack align="start" gap={1.5} flex="1">
          <Skeleton height="5" width="180px" borderRadius="md" />
          <Skeleton height="3" width="140px" borderRadius="md" />
        </VStack>
        <Skeleton height="9" width="20" borderRadius="lg" />
      </HStack>
    );
  }

  return (
    <HStack
      gap={4}
      p={4}
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.subtle"
      justify="space-between"
      align="center"
    >
      {/* Left: Avatar & Info */}
      <HStack gap={3} flex="1" minW="0">
        <Avatar.Root colorPalette="brand" variant="subtle" size="lg">
          <Avatar.Fallback name={profile?.fullname} />
        </Avatar.Root>

        <VStack gap={0.5} align="start" flex="1" minW="0">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="fg.default"
            lineClamp={1}
          >
            {profile?.fullname}
          </Text>
          <HStack gap={2} fontSize="sm" color="fg.muted">
            <Text fontFamily="mono">
              #{profile?.id.slice(0, 8).toUpperCase()}
            </Text>
            <Text>•</Text>
            <Text>
              Bergabung {dayjs(profile?.created_at).format("MMM YYYY")}
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {/* Right: Contact & Actions */}
      <HStack gap={3} flexShrink={0}>
        {profile?.email && (
          <HStack gap={2} px={3} py={2} bg="bg.subtle" borderRadius="lg">
            <Icon color="fg.muted">
              <LuMail size={14} />
            </Icon>
            <Text fontSize="sm" color="fg.default" maxW="200px" lineClamp={1}>
              {profile.email}
            </Text>
          </HStack>
        )}

        {profile?.phone && (
          <HStack gap={2} px={3} py={2} bg="bg.subtle" borderRadius="lg">
            <Icon color="fg.muted">
              <LuPhone size={14} />
            </Icon>
            <Text fontSize="sm" color="fg.default">
              {profile.phone}
            </Text>
          </HStack>
        )}

        <Button size="sm" variant="ghost" borderRadius="lg">
          <LuEllipsis size={16} />
        </Button>
      </HStack>
    </HStack>
  );
};
