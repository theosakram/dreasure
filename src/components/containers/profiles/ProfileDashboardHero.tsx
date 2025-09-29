"use client";

import { CustomLink } from "@/components/custom/CustomLink";
import { useGetOrgsByOwnerId } from "@/features/orgs/orgHooks";
import {
  For,
  SimpleGrid,
  Stack,
  Heading,
  Card,
  Text,
  Flex,
  Box,
  Icon,
  Badge,
  Spacer,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { LuChevronRight, LuPlus } from "react-icons/lu";

export const ProfileDashboardHero = () => {
  const { data: orgs } = useGetOrgsByOwnerId();

  return (
    <Stack gap="2rem" align="start">
      <Flex w="100%">
        <Heading>Organisasi</Heading>
        <Spacer />
        <Button size="sm" colorPalette="brand">
          <LuPlus />
          Buat Organisasi
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="100%">
        <For each={orgs?.data}>
          {(org) => (
            <CustomLink href={`/cash/${org.id}`} key={org.id}>
              <Card.Root
                key={org.id}
                boxShadow="md"
                borderRadius="xl"
                bg="bg.panel"
                cursor="pointer"
                _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                transition="all 0.2s ease-in-out"
                borderWidth="1px"
                borderColor="border.muted"
                p={0}
                w="100%"
              >
                <Card.Header px={5} pt={4} pb={2}>
                  <Flex w="100%" align="center">
                    <Box flex="1">
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color="fg.default"
                        mb={1}
                        truncate
                      >
                        {org.name}
                      </Text>

                      <Badge colorPalette="blue" variant="subtle" fontSize="xs">
                        Dibuat {dayjs(org.created_at).format("DD MMM YYYY")}
                      </Badge>
                    </Box>
                    <Icon as={LuChevronRight} color="fg.muted" boxSize={6} />
                  </Flex>
                </Card.Header>
                <Card.Body p={0} pb="1rem" />
              </Card.Root>
            </CustomLink>
          )}
        </For>
      </SimpleGrid>
    </Stack>
  );
};
