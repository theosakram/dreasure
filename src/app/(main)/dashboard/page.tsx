import { Box, Button, Card, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <Box p={6}>
      <Stack gap={6}>
        <Heading size="xl">Dashboard</Heading>
        <Text color="fg.muted">
          Welcome to your main application dashboard! This page uses the main
          layout with navigation, sidebar, and footer.
        </Text>

        <Card.Root>
          <Card.Body>
            <Stack gap={4}>
              <Heading size="md">Quick Stats</Heading>
              <Text>This would show your main application content</Text>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
}
