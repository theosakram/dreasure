import { Link, Text, Icon } from "@chakra-ui/react";
import { NavigationItem } from "@/config/navigation";

type NavigationItemProps = {
  item: NavigationItem;
  isActive?: boolean;
};

export const NavItem = ({ item, isActive = false }: NavigationItemProps) => {
  return (
    <Link
      href={item.href}
      p={3}
      rounded="md"
      _hover={{ bg: isActive ? "brand.100" : "bg.muted" }}
      bg={isActive ? "brand.50" : "transparent"}
      color={isActive ? "brand.fg" : "fg"}
      display="flex"
      alignItems="center"
      gap={3}
      transition="all 0.2s"
    >
      <Icon>
        <item.icon />
      </Icon>
      <Text fontWeight={isActive ? "medium" : "normal"}>{item.label}</Text>
    </Link>
  );
};
