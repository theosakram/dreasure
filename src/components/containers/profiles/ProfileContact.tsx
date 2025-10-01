import { HStack, Icon, Button, Text } from "@chakra-ui/react";
import { LuMail, LuPhone, LuEllipsis } from "react-icons/lu";

type ProfileContactProps = {
  email?: string;
  phone?: string;
};

export const ProfileContact = (props: ProfileContactProps) => {
  return (
    <HStack gap={3} flexShrink={0}>
      {props?.email && (
        <HStack gap={2} px={3} py={2} bg="bg.subtle" borderRadius="lg">
          <Icon color="fg.muted">
            <LuMail size={14} />
          </Icon>
          <Text fontSize="sm" color="fg.default" maxW="200px" lineClamp={1}>
            {props.email}
          </Text>
        </HStack>
      )}

      {props?.phone && (
        <HStack gap={2} px={3} py={2} bg="bg.subtle" borderRadius="lg">
          <Icon color="fg.muted">
            <LuPhone size={14} />
          </Icon>
          <Text fontSize="sm" color="fg.default">
            {props.phone}
          </Text>
        </HStack>
      )}

      <Button size="sm" variant="ghost" borderRadius="lg">
        <LuEllipsis size={16} />
      </Button>
    </HStack>
  );
};
