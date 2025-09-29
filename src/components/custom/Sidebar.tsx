"use client";

import {
  Heading,
  Stack,
  IconButton,
  Tooltip,
  Portal,
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
import { useParams, usePathname } from "next/navigation";
import { isNavItemActive } from "@/utils/helpers/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { CustomLink } from "./CustomLink";

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
  const { orgId } = useParams<{ orgId: string }>();

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
      borderColor="border.muted"
      p={4}
      transition="width 0.3s ease"
      position="relative"
      direction="column"
    >
      <Stack gap={6} h="full">
        {/* Header with toggle button */}
        <Stack direction="row" justify="space-between" align="center">
          {isExpanded && (
            <Heading
              size="md"
              color="fg.default"
              opacity={isExpanded ? 1 : 0}
              transition="opacity 0.2s ease"
            >
              {appName}
            </Heading>
          )}

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                color="fg.muted"
                _hover={{
                  bg: "bg.muted",
                  color: "fg.default",
                }}
                ml={!isExpanded ? -1 : 0}
              >
                {isExpanded ? <FaAngleLeft /> : <HiMenuAlt2 />}
              </IconButton>
            </Tooltip.Trigger>
            <Portal>
              <Tooltip.Positioner>
                <Tooltip.Content>
                  {isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Portal>
          </Tooltip.Root>
        </Stack>

        {/* Navigation items */}
        <Stack gap={2} flex={1}>
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
        <Button w="100%" colorPalette="brand" variant="solid" size="sm">
          <LuArrowLeft />
          Organisasi
        </Button>
      </CustomLink>
    </Flex>
  );
};
