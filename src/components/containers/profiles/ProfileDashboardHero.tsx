"use client";

import { CustomLink } from "@/components/custom/CustomLink";
import { useGetOrgsByOwnerId } from "@/features/orgs/orgHooks";
import {
  For,
  SimpleGrid,
  VStack,
  Heading,
  Card,
  Text,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { LuChevronRight, LuPlus } from "react-icons/lu";

export const ProfileDashboardHero = () => {
  const { data: orgs } = useGetOrgsByOwnerId();

  return (
    <VStack gap={6} align="stretch" p={6}>
      <HStack justify="space-between" align="center">
        <Heading size="xl" fontWeight="bold" color="fg.default">
          Organisasi
        </Heading>
        <Button
          size="sm"
          colorPalette="brand"
          variant="solid"
          borderRadius="lg"
        >
          <LuPlus />
          Buat Organisasi
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="100%">
        <For each={orgs?.data}>
          {(org) => (
            <CustomLink href={`/${org.id}/cash`} key={org.id}>
              <Card.Root
                bg="bg.panel"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.subtle"
                cursor="pointer"
                transition="all 0.15s"
                _hover={{
                  borderColor: "border.emphasized",
                  shadow: "sm",
                }}
                w="100%"
              >
                <Card.Body p={5}>
                  <HStack justify="space-between" align="start" w="100%">
                    <VStack gap={1} align="start" flex="1" minW="0">
                      <Text
                        fontWeight="semibold"
                        fontSize="md"
                        color="fg.default"
                        lineClamp={1}
                      >
                        {org.name}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        Dibuat {dayjs(org.created_at).format("DD MMM YYYY")}
                      </Text>
                    </VStack>
                    <Icon color="fg.muted" boxSize={5}>
                      <LuChevronRight />
                    </Icon>
                  </HStack>
                </Card.Body>
              </Card.Root>
            </CustomLink>
          )}
        </For>
      </SimpleGrid>
    </VStack>
  );
};
