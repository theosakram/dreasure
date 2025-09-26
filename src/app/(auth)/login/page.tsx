"use client";

import { supabase } from "@/supabase";
import { Form } from "@/components/custom/Form";
import { loginSchema } from "@/utils/forms/login/loginSchema";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  VStack,
  Separator,
  IconButton,
} from "@chakra-ui/react";
import {
  RiGoogleFill,
  RiGithubFill,
  RiAppleFill,
  RiLockLine,
  RiMailLine,
} from "react-icons/ri";
import { z } from "zod";
import { FormField } from "@/components/custom/FormFIeld";
import { PasswordFormInput } from "@/components/custom/PasswordFormInput";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values: LoginFormValues) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, blue.500 0%, purple.600 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card.Root
        maxW="md"
        w="full"
        variant="elevated"
        shadow="xl"
        rounded="2xl"
        overflow="hidden"
      >
        {/* Header Section */}
        <Box
          bg="linear-gradient(135deg, blue.600 0%, purple.700 100%)"
          p={8}
          textAlign="center"
          color="white"
        >
          <Box
            w={16}
            h={16}
            bg="whiteAlpha.200"
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={4}
          >
            <Icon size="lg" color="white">
              <RiLockLine />
            </Icon>
          </Box>
          <Heading size="lg" mb={2}>
            Welcome Back
          </Heading>
          <Text opacity={0.9}>Sign in to your account to continue</Text>
        </Box>

        <Card.Body p={8}>
          <Stack gap={6}>
            <VStack gap={3}>
              <Text textStyle="sm" color="fg.muted" textAlign="center">
                Sign in with
              </Text>
              <HStack w="full" gap={3}>
                <Button
                  variant="outline"
                  flex={1}
                  size="lg"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <Icon color="red.500">
                    <RiGoogleFill />
                  </Icon>
                  Google
                </Button>
                <IconButton
                  variant="outline"
                  size="lg"
                  onClick={() => handleSocialLogin("GitHub")}
                  aria-label="Login with GitHub"
                >
                  <Icon>
                    <RiGithubFill />
                  </Icon>
                </IconButton>
                <IconButton
                  variant="outline"
                  size="lg"
                  onClick={() => handleSocialLogin("Apple")}
                  aria-label="Login with Apple"
                >
                  <Icon>
                    <RiAppleFill />
                  </Icon>
                </IconButton>
              </HStack>
            </VStack>

            <HStack>
              <Separator flex={1} />
              <Text textStyle="xs" color="fg.muted" px={3}>
                OR
              </Text>
              <Separator flex={1} />
            </HStack>

            <Form<LoginFormValues>
              schema={loginSchema}
              onSubmit={(e, f) => handleLogin(e).then(() => f.reset())}
              initialValues={{ email: "", password: "" }}
            >
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Stack gap={6}>
                    <FormField<string>
                      name="email"
                      label="Email Address"
                      isRequired
                    >
                      {({ input }) => (
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <RiMailLine />
                            </Icon>
                          }
                        >
                          <Input
                            {...input}
                            type="email"
                            placeholder="Enter your email"
                            size="lg"
                          />
                        </InputGroup>
                      )}
                    </FormField>

                    <PasswordFormInput />

                    <Flex justify="space-between" align="center">
                      <Text textStyle="sm" color="fg.muted">
                        {/* Checkbox would go here in a full implementation */}
                        Remember me
                      </Text>
                      <Link
                        href="#"
                        textStyle="sm"
                        color="blue.500"
                        fontWeight="medium"
                        _hover={{ color: "blue.600" }}
                      >
                        Forgot password?
                      </Link>
                    </Flex>

                    <Button
                      size="lg"
                      colorPalette="blue"
                      onClick={handleSubmit}
                      loading={submitting}
                      loadingText="Signing in..."
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
              )}
            </Form>

            <Text textAlign="center" textStyle="sm" color="fg.muted">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                color="blue.500"
                fontWeight="medium"
                _hover={{ color: "blue.600" }}
              >
                Sign up here
              </Link>
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
