import { ProfileDashboardHero } from "@/components/containers/profiles/ProfileDashboardHero";
import { Box } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Box w="100%" maxW="1400px" mx="auto">
      <ProfileDashboardHero />
    </Box>
  );
};

export default DashboardPage;
