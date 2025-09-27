"use client";

import { Box, Heading, HStack, Button, Icon } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "@/supabase/actions";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type HeaderProps = {
  showLogout?: boolean;
};

export const Header = ({ showLogout = true }: HeaderProps) => {
  const pathname = usePathname();
  const title = useMemo(() => {
    const popped = pathname.split("/").pop();
    if (popped === "cash") return "Uang Kas";
    if (popped === "revolving") return "Uang Bergulir";
    return popped;
  }, [pathname]);

  return (
    <Box bg="bg" borderBottomWidth="1px" borderColor="border.muted" p={4}>
      <HStack justify="space-between">
        <Heading size="lg" textTransform="capitalize">
          {title}
        </Heading>
        <HStack gap={2}>
          <ColorModeButton />
          {showLogout && (
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">
                <Icon>
                  <RiLogoutBoxLine />
                </Icon>
              </Button>
            </form>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
