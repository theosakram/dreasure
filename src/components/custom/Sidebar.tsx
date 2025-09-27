import { Box, Heading, Stack } from "@chakra-ui/react";
import { navigationItems } from "@/config/navigation";
import { NavItem } from "./NavItem";

type SidebarProps = {
  appName?: string;
  currentPath?: string;
};

export const Sidebar = ({
  appName = "Dreasure",
  currentPath,
}: SidebarProps) => {
  return (
    <Box w="64" bg="bg" borderRightWidth="1px" borderColor="border.muted" p={4}>
      <Stack gap={6}>
        <Heading size="md" color="fg">
          {appName}
        </Heading>

        <Stack gap={2}>
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={currentPath === item.href}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};
