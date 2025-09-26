import { Button, Center, Heading, Stack, Card } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Center minH="100vh" bg="gray.50">
      <Card.Root maxW="lg" w="full" variant="elevated">
        <Card.Body p={8}>
          <Stack gap={6} textAlign="center">
            <Heading size="2xl" color="gray.800">
              Welcome to Dreasure
            </Heading>
            <Stack gap={4}>
              <Button asChild colorPalette="blue" size="lg">
                <Link href="/login">Go to Login (Auth Layout)</Link>
              </Button>
              <Button asChild colorPalette="green" size="lg" variant="outline">
                <Link href="/signup">Go to Signup (Auth Layout)</Link>
              </Button>
              <Button asChild colorPalette="purple" size="lg" variant="outline">
                <Link href="/dashboard">Go to Dashboard (Main Layout)</Link>
              </Button>
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
