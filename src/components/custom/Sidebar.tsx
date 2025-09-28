"use client";

import {
  Box,
  Heading,
  Stack,
  IconButton,
  Tooltip,
  Portal,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { IconType } from "react-icons";
import { FaWallet, FaSyncAlt, FaAngleLeft } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { isNavItemActive } from "@/utils/helpers/navigation";

type SidebarProps = {
  appName?: string;
};

type NavigationItem = {
  href: string;
  label: string;
  icon: IconType;
  matchPatterns?: string[];
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/cash",
    label: "Uang Kas",
    icon: FaWallet,
  },
  {
    href: "/revolving",
    label: "Dana Bergulir",
    icon: FaSyncAlt,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: RiUserLine,
    matchPatterns: ["/members/detail"],
  },
];

export const Sidebar = ({ appName = "Dreasure" }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      w={isExpanded ? "64" : "16"}
      h="100vh"
      bg="bg.panel"
      borderRightWidth="1px"
      borderColor="border.muted"
      p={4}
      transition="width 0.3s ease"
      position="relative"
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
    </Box>
  );
};
