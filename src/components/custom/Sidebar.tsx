"use client";

import {
  Heading,
  Stack,
  IconButton,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { IconType } from "react-icons";
import { FaWallet, FaSyncAlt, FaAngleLeft } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { isNavItemActive } from "@/utils/helpers/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { CustomLink } from "./CustomLink";
import { useGetIdsFromParam } from "@/utils/helpers/hooks/useGetIdsFromParam";

type SidebarProps = {
  appName?: string;
};

type NavigationItem = {
  href: string;
  label: string;
  icon: IconType;
  matchPatterns?: string[];
};

export const Sidebar = ({ appName = "Dreasury" }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const { orgId } = useGetIdsFromParam();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navigationItems: NavigationItem[] = useMemo(() => {
    return [
      {
        href: `/${orgId}/cash`,
        label: "Uang Kas",
        icon: FaWallet,
        matchPatterns: ["/cash", "/cash/detail"],
      },
      {
        href: `/${orgId}/revolving`,
        label: "Dana Bergulir",
        icon: FaSyncAlt,
        matchPatterns: ["/revolving", "/revolving/detail"],
      },
      {
        href: `/${orgId}/members`,
        label: "Anggota",
        icon: RiUserLine,
        matchPatterns: ["/members", "/members/detail"],
      },
    ];
  }, [orgId]);

  return (
    <Flex
      w={isExpanded ? "64" : "16"}
      h="100vh"
      bg="bg.panel"
      borderRightWidth="1px"
      borderColor="border.subtle"
      p={3}
      transition="width 0.2s ease"
      position="relative"
      direction="column"
    >
      <Stack gap={4} h="full">
        {/* Header with toggle button */}
        <Stack direction="row" justify="space-between" align="center" h="12">
          {isExpanded && (
            <Heading
              size="md"
              color="fg.default"
              fontWeight="bold"
              opacity={isExpanded ? 1 : 0}
              transition="opacity 0.15s ease"
            >
              {appName}
            </Heading>
          )}

          <IconButton
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            color="fg.muted"
            borderRadius="lg"
            _hover={{
              bg: "bg.subtle",
              color: "fg.default",
            }}
            ml={!isExpanded ? -1 : 0}
          >
            {isExpanded ? <FaAngleLeft /> : <HiMenuAlt2 />}
          </IconButton>
        </Stack>

        {/* Navigation items */}
        <Stack gap={1} flex={1}>
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={isNavItemActive(item, pathname)}
              isCollapsed={!isExpanded}
            />
          ))}
        </Stack>
      </Stack>

      <Spacer />
      <CustomLink href="/orgs">
        <Button
          w="100%"
          colorPalette="brand"
          variant="outline"
          size="sm"
          borderRadius="lg"
          justifyContent={isExpanded ? "flex-start" : "center"}
        >
          <LuArrowLeft />
          {isExpanded && "Organisasi"}
        </Button>
      </CustomLink>
    </Flex>
  );
};
