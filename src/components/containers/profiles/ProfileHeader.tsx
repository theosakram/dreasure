import { Loader } from "@/components/custom/Loader";
import { useGetProfileById } from "@/features/profiles/profileHooks";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";
import { HStack } from "@chakra-ui/react";
import { ProfileContact } from "./ProfileContact";
import { ProfileInfo } from "./ProfileInfo";

export const ProfileHeader = () => {
  const { userId } = useGetIdsFromParam();
  const { data: profile, isLoading } = useGetProfileById(userId);

  if (isLoading) {
    return <Loader />;
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
      <ProfileInfo {...profile} />
      <ProfileContact {...profile} />
    </HStack>
  );
};
