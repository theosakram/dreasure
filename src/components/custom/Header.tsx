"use client";

import {
  HStack,
  Button,
  Box,
  Text,
  VStack,
  Separator,
  Breadcrumb,
  Skeleton,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuWallet, LuUsers } from "react-icons/lu";
import { logout } from "@/supabase/actions";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome, FaSyncAlt } from "react-icons/fa";
import { useGetSelf } from "@/features/profiles/profileHooks";
import { GoOrganization } from "react-icons/go";
import { useGetOrgById } from "@/features/orgs/orgHooks";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";

type HeaderProps = {
  showLogout?: boolean;
  type?: "org" | "main";
};

export const Header = ({ showLogout = true, type = "main" }: HeaderProps) => {
  const pathname = usePathname();
  const { data: selfData, isLoading } = useGetSelf();
  const { orgId } = useGetIdsFromParam();
  const { data: selfOrg } = useGetOrgById(orgId);

  const pageInfo = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments.pop();

    // Page configuration
    const pageConfig = {
      cash: {
        title: "Uang Kas",
        icon: LuWallet,
      },
      revolving: {
        title: "Dana Bergulir",
        icon: FaSyncAlt,
      },
      members: {
        title: "Anggota",
        icon: LuUsers,
      },
      default: {
        title: "Dreasury",
        icon: FaHome,
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
    <HStack
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      px={4}
      py={3}
      justify="space-between"
      align="center"
    >
      {/* Left: Breadcrumb or Title */}
      {type === "org" ? (
        <HStack gap={3} align="center">
          {isLoading ? (
            <Skeleton height="20px" width="180px" borderRadius="md" />
          ) : (
            <>
              <Box p={2} borderRadius="lg" bg="brand.muted" color="brand.fg">
                <GoOrganization size={20} />
              </Box>
              <VStack gap={0} align="start">
                <Text fontSize="xs" color="fg.muted">
                  Organisasi milik
                </Text>
                <Text fontSize="md" fontWeight="semibold" color="fg.default">
                  {selfData?.profile.fullname}
                </Text>
              </VStack>
            </>
          )}
        </HStack>
      ) : (
        <Breadcrumb.Root size="sm">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link fontWeight="semibold" color="fg.default">
                {selfOrg?.name || "Dashboard"}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link color="fg.muted">
                {pageInfo.icon && <pageInfo.icon />}
                {pageInfo.title}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      )}

      {/* Right: Time, Theme, Logout */}
      <HStack gap={3} align="center">
        {/* Time/Date */}
        <VStack gap={0} align="end">
          <Text fontSize="sm" fontWeight="medium" color="fg.default">
            {currentTime}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {currentDate}
          </Text>
        </VStack>

        <Separator orientation="vertical" h="8" />

        {/* Actions */}
        <HStack gap={2}>
          <ColorModeButton variant="ghost" size="sm" borderRadius="lg" />

          {showLogout && (
            <form action={logout}>
              <Button
                variant="ghost"
                colorPalette="red"
                size="sm"
                type="submit"
                borderRadius="lg"
              >
                <RiLogoutBoxLine size={16} />
              </Button>
            </form>
          )}
        </HStack>
      </HStack>
    </HStack>
  );
};
