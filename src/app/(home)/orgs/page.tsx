import { ProfileDashboardHero } from "@/components/containers/profiles/ProfileDashboardHero";
import { Center, Container, Stack } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <Center w="100%">
      <Container maxW="container.xl" p={4}>
        <Stack w="100%">
          <ProfileDashboardHero />
        </Stack>
      </Container>
    </Center>
  );
};

export default DashboardPage;
