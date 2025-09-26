"use client";

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
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/supabase/actions";
import { supabaseClient } from "@/supabase/client";
import { useEffect, useState } from "react";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = supabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const returnTo = searchParams.get("returnTo") || "/dashboard";
        router.replace(returnTo);
        return;
      }

      setIsLoading(false);
    };

    checkUser();
  }, [router, searchParams]);

  const handleLogin = async (values: LoginFormValues) => {
    const returnTo = searchParams.get("returnTo") || "/dashboard";

    await login({
      email: values.email,
      password: values.password,
      returnTo,
    });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, blue.500 0%, purple.600 100%)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={3}>
          <Box
            w={8}
            h={8}
            border="2px solid"
            borderColor="whiteAlpha.300"
            borderTopColor="white"
            borderRadius="full"
            animation="spin 1s linear infinite"
          />
          <Text color="white" textStyle="sm">
            Checking authentication...
          </Text>
        </VStack>
      </Box>
    );
  }

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
              onSubmit={handleLogin}
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
