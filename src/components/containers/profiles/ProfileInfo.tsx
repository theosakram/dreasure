import { HStack, Avatar, VStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

type ProfileInfoProps = {
  fullname?: string;
  id?: string;
  created_at?: string;
};

export const ProfileInfo = (props: ProfileInfoProps) => {
  return (
    <HStack gap={3} flex="1" minW="0">
      <Avatar.Root colorPalette="brand" variant="subtle" size="lg">
        <Avatar.Fallback name={props?.fullname} />
      </Avatar.Root>

      <VStack gap={0.5} align="start" flex="1" minW="0">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="fg.default"
          lineClamp={1}
        >
          {props?.fullname}
        </Text>
        <HStack gap={2} fontSize="sm" color="fg.muted">
          <Text fontFamily="mono">
            {props?.id ? `#${props.id.slice(0, 8).toUpperCase()}` : "#--------"}
          </Text>
          <Text>•</Text>
          <Text>Bergabung {dayjs(props?.created_at).format("MMM YYYY")}</Text>
        </HStack>
      </VStack>
    </HStack>
  );
};
