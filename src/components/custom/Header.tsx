import { Box, Heading, HStack, Button, Icon } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "@/supabase/actions";

type HeaderProps = {
  title?: string;
  showLogout?: boolean;
};

export const Header = ({
  title = "Dashboard",
  showLogout = true,
}: HeaderProps) => {
  return (
    <Box bg="bg" borderBottomWidth="1px" borderColor="border.muted" p={4}>
      <HStack justify="space-between">
        <Heading size="lg">{title}</Heading>
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
