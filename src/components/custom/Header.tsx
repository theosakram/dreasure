"use client";

import {
  HStack,
  Button,
  Flex,
  Box,
  Text,
  Group,
  VStack,
  Separator,
  Breadcrumb,
  Spacer,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuWallet, LuUsers } from "react-icons/lu";
import { logout } from "@/supabase/actions";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome, FaSyncAlt } from "react-icons/fa";

type HeaderProps = {
  showLogout?: boolean;
};

export const Header = ({ showLogout = true }: HeaderProps) => {
  const pathname = usePathname();

  const pageInfo = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments.pop();

    // Page configuration
    const pageConfig = {
      cash: {
        title: "Uang Kas",
        subtitle: "Kelola setoran dan penarikan kas",
        icon: LuWallet,
        color: "blue",
        gradient: "blue.500/10",
        gradientTo: "green.500/10",
      },
      revolving: {
        title: "Dana Bergulir",
        subtitle: "Pantau cicilan dan pembayaran",
        icon: FaSyncAlt,
        color: "orange",
        gradient: "orange.500/10",
        gradientTo: "red.500/10",
      },
      members: {
        title: "Anggota",
        subtitle: "Daftar dan profil anggota",
        icon: LuUsers,
        color: "purple",
        gradient: "purple.500/10",
        gradientTo: "blue.500/10",
      },
      default: {
        title: "Dreasury",
        subtitle: "Sistem manajemen keuangan",
        icon: FaHome,
        color: "gray",
        gradient: "gray.500/10",
        gradientTo: "blue.500/10",
      },
    };

    return (
      pageConfig[lastSegment as keyof typeof pageConfig] || pageConfig.default
    );
  }, [pathname]);

  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border.muted"
      position="relative"
      overflow="hidden"
    >
      {/* Gradient Background */}
      <Box
        bgGradient="to-r"
        gradientFrom={pageInfo.gradient}
        gradientTo={pageInfo.gradientTo}
        position="absolute"
        inset={0}
        _dark={{
          gradientFrom: `${pageInfo.color}.400/15`,
          gradientTo: "blue.400/15",
        }}
      />

      {/* Decorative Elements */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="32"
        h="32"
        bg={`${pageInfo.color}.500/5`}
        borderRadius="full"
        transform="translate(16px, -16px)"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        w="24"
        h="24"
        bg={`${pageInfo.color}.500/5`}
        borderRadius="full"
        transform="translate(-12px, 12px)"
      />

      <Flex w="100%" align="center" p="1rem">
        <Breadcrumb.Root size="lg">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link>Dashboard</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link fontWeight="bold">
                {pageInfo.icon && <pageInfo.icon />}
                {pageInfo.title}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        <Spacer />
        {/* Right Side - Actions */}
        <HStack gap={3} align="center">
          {/* User Section */}
          <HStack gap={3}>
            <VStack gap={0} align="end">
              <Text fontSize="sm" fontWeight="medium" color="fg">
                {currentTime}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {currentDate}
              </Text>
            </VStack>
          </HStack>

          <Separator orientation="vertical" h="6" borderColor="white" />

          {/* Theme & Logout */}
          <Group gap={2}>
            <ColorModeButton variant="surface" size="sm" borderRadius="full" />

            {showLogout && (
              <form action={logout}>
                <Button
                  variant="surface"
                  colorPalette="red"
                  size="sm"
                  type="submit"
                  borderRadius="full"
                  px={3}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "sm",
                  }}
                  transition="all 0.2s"
                >
                  <RiLogoutBoxLine size={16} />
                </Button>
              </form>
            )}
          </Group>
        </HStack>
      </Flex>
    </Box>
  );
};
