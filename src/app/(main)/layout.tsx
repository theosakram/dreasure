import type { Metadata } from "next";
import { Box, Flex, ScrollArea } from "@chakra-ui/react";
import { Sidebar } from "@/components/custom/Sidebar";
import { Header } from "@/components/custom/Header";

export const metadata: Metadata = {
  title: "Dashboard - Dreasury",
  description: "Your dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex minH="100vh" bg="bg.default">
      <Sidebar />

      <Flex direction="column" w="100%">
        <Header />

        <ScrollArea.Root h="calc(100vh - 5rem)">
          <ScrollArea.Viewport>
            <ScrollArea.Content>
              <Box flex={1} p={6}>
                {children}
              </Box>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </Flex>
    </Flex>
  );
}
