import { Text, Icon, Tooltip, Portal } from "@chakra-ui/react";
import { CustomLink } from "./CustomLink";

type NavigationItem = {
  href: string;
  label: string;
  icon: React.ComponentType;
};

type NavigationItemProps = {
  item: NavigationItem;
  isActive?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
};

export const NavItem = ({
  item,
  isActive = false,
  onClick,
  isCollapsed = false,
}: NavigationItemProps) => {
  return (
    <Tooltip.Root disabled={!isCollapsed}>
      <Tooltip.Trigger asChild>
        <CustomLink
          href={item.href}
          linkProps={{
            p: 2.5,
            rounded: "lg",
            _hover: {
              bg: isActive ? "brand.emphasized" : "bg.subtle",
            },
            bg: isActive ? "brand.muted" : "transparent",
            color: isActive ? "brand.fg" : "fg.default",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: isCollapsed ? 0 : 3,
            transition: "all 0.15s ease",
            onClick,
            fontWeight: isActive ? "semibold" : "medium",
            fontSize: "sm",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textDecoration: "none",
            border: isActive ? "1px solid" : "1px solid transparent",
            borderColor: isActive ? "brand.emphasized" : "transparent",
            _active: { outline: "none" },
            _focus: { outline: "none" },
            _focusVisible: { outline: "none" },
          }}
        >
          <Icon boxSize={4.5} flexShrink={0}>
            <item.icon />
          </Icon>
          <Text
            opacity={isCollapsed ? 0 : 1}
            transform={isCollapsed ? "translateX(-10px)" : "translateX(0)"}
            transition="all 0.15s ease"
            visibility={isCollapsed ? "hidden" : "visible"}
            width={isCollapsed ? 0 : "auto"}
            overflow="hidden"
          >
            {item.label}
          </Text>
        </CustomLink>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>{item.label}</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
};
