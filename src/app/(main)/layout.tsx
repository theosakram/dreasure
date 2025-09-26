import type { Metadata } from "next";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  Button,
  Separator,
} from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiSettingsLine,
  RiUserLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "Dashboard - Dreasure",
  description: "Your dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" bg="bg.subtle">
      {/* Sidebar */}
      <Box
        w="64"
        bg="bg"
        borderRightWidth="1px"
        borderColor="border.muted"
        p={4}
      >
        <Stack gap={6}>
          <Heading size="md" color="fg">
            Dreasure
          </Heading>

          <Stack gap={2}>
            <Link
              href="/dashboard"
              p={3}
              rounded="md"
              _hover={{ bg: "bg.muted" }}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Icon>
                <RiDashboardLine />
              </Icon>
              <Text>Dashboard</Text>
            </Link>
            <Link
              href="/profile"
              p={3}
              rounded="md"
              _hover={{ bg: "bg.muted" }}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Icon>
                <RiUserLine />
              </Icon>
              <Text>Profile</Text>
            </Link>
            <Link
              href="/settings"
              p={3}
              rounded="md"
              _hover={{ bg: "bg.muted" }}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Icon>
                <RiSettingsLine />
              </Icon>
              <Text>Settings</Text>
            </Link>
          </Stack>

          <Separator />

          <Button variant="ghost" justifyContent="flex-start" w="full">
            <Icon>
              <RiLogoutBoxLine />
            </Icon>
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Flex direction="column" flex={1}>
        {/* Header */}
        <Box bg="bg" borderBottomWidth="1px" borderColor="border.muted" p={4}>
          <HStack justify="space-between">
            <Heading size="lg">Dashboard</Heading>
            <Button size="sm" colorPalette="blue">
              New Item
            </Button>
          </HStack>
        </Box>

        {/* Page Content */}
        <Box flex={1} p={6}>
          {children}
        </Box>

        {/* Footer */}
        <Box
          bg="bg"
          borderTopWidth="1px"
          borderColor="border.muted"
          p={4}
          textAlign="center"
        >
          <Text textStyle="sm" color="fg.muted">
            © 2025 Dreasure. Built with Next.js and Chakra UI v3
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
