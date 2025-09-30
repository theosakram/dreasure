"use client";

import { Form } from "@/components/custom/Form";
import { loginSchema } from "@/utils/forms/schemas/loginSchema";
import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Icon,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  RiLockLine,
  RiMailLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import { z } from "zod";
import { FormField } from "@/components/custom/FormFIeld";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { login } from "@/supabase/actions";
import { supabaseClient } from "@/supabase/client";

type LoginFormValues = z.infer<typeof loginSchema>;

// Types for SOLID principles (Interface Segregation)
interface LoadingSpinnerProps {
  text: string;
}

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

interface InputFieldProps {
  name: keyof LoginFormValues;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactElement;
  isRequired?: boolean;
}

// Single Responsibility Principle - Each component has one clear purpose
const LoadingSpinner = ({ text }: LoadingSpinnerProps) => (
  <Box
    h="100vh"
    bg="bg.canvas"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <VStack gap={4}>
      <Box position="relative">
        <Box
          w={12}
          h={12}
          border="3px solid"
          borderColor="border.subtle"
          borderRadius="full"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          w={12}
          h={12}
          border="3px solid transparent"
          borderTopColor="brand.solid"
          borderRadius="full"
          animation="spin 1s linear infinite"
        />
      </Box>
      <Text color="fg.muted" fontSize="md" fontWeight="medium">
        {text}
      </Text>
    </VStack>
  </Box>
);

const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <VStack gap={4} textAlign="center">
    {/* Brand Icon */}
    <Box p={4} borderRadius="2xl" bg="brand.muted" color="brand.fg">
      <Icon fontSize="4xl">
        <TbMoneybag />
      </Icon>
    </Box>

    <VStack gap={2}>
      <Heading size="3xl" color="fg.default" fontWeight="bold">
        {title}
      </Heading>
      <Text color="fg.muted" fontSize="sm" maxW="md">
        {subtitle}
      </Text>
    </VStack>
  </VStack>
);

const CustomInputField = ({
  name,
  label,
  type,
  placeholder,
  icon,
  isRequired = false,
}: InputFieldProps) => (
  <FormField<string> name={name} label={label} isRequired={isRequired}>
    {({ input }) => (
      <InputGroup
        startElement={
          <Icon color="fg.subtle" size="sm">
            {icon}
          </Icon>
        }
      >
        <Input
          {...input}
          type={type}
          placeholder={placeholder}
          size="md"
          bg="bg.canvas"
          border="1px solid"
          borderColor="border.subtle"
          _hover={{
            borderColor: "border.emphasized",
          }}
          _focus={{
            borderColor: "brand.emphasized",
            shadow: "0 0 0 1px var(--chakra-colors-brand-emphasized)",
          }}
          fontSize="md"
        />
      </InputGroup>
    )}
  </FormField>
);

const PasswordInputField = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField<string> name="password" label="Kata Sandi" isRequired>
      {({ input }) => (
        <InputGroup
          startElement={
            <Icon color="fg.subtle" size="sm">
              <RiLockLine />
            </Icon>
          }
          endElement={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              color="fg.muted"
              _hover={{ color: "brand.500" }}
            >
              <Icon size="sm">
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </Icon>
            </Button>
          }
        >
          <Input
            {...input}
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi Anda"
            size="sm"
            bg="bg.canvas"
            border="1px solid"
            borderColor="border.subtle"
            _hover={{
              borderColor: "border.emphasized",
            }}
            _focus={{
              borderColor: "brand.emphasized",
              shadow: "0 0 0 1px var(--chakra-colors-brand-emphasized)",
            }}
            fontSize="md"
          />
        </InputGroup>
      )}
    </FormField>
  );
};

// Data configuration (Open/Closed Principle)
const FORM_FIELDS = [
  {
    name: "email" as const,
    label: "Alamat Email",
    type: "email",
    placeholder: "Masukkan alamat email Anda",
    icon: <RiMailLine />,
    isRequired: true,
  },
];

// Separate component that uses useSearchParams
function LoginContent() {
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
        const returnTo = searchParams.get("returnTo") || "/orgs";
        router.replace(returnTo);
        return;
      }

      setIsLoading(false);
    };

    checkUser();
  }, [router, searchParams]);

  const handleLogin = async (values: LoginFormValues) => {
    const returnTo = searchParams.get("returnTo") || "/orgs";

    await login({
      email: values.email,
      password: values.password,
      returnTo,
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Memeriksa autentikasi..." />;
  }

  return (
    <Center
      w="100vw"
      maxH="100vh"
      h="100vh"
      bg="bg.canvas"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root
        maxW="md"
        w="full"
        variant="elevated"
        rounded="2xl"
        overflow="hidden"
        border="1px solid"
        borderColor="border.emphasized"
        bg="bg.panel"
      >
        <Card.Body p={10}>
          <Stack gap={8}>
            <FormHeader
              title="Selamat Datang"
              subtitle="Masuk ke akun Dreasury Anda untuk melanjutkan mengelola keuangan"
            />

            <Form<LoginFormValues>
              schema={loginSchema}
              onSubmit={handleLogin}
              initialValues={{ email: "", password: "" }}
            >
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Stack gap={4}>
                    {FORM_FIELDS.map((field) => (
                      <CustomInputField key={field.name} {...field} />
                    ))}

                    <PasswordInputField />

                    <VStack gap={4} pt={2}>
                      <Button
                        size="lg"
                        colorPalette="brand"
                        onClick={handleSubmit}
                        loading={submitting}
                        loadingText="Sedang masuk..."
                        type="submit"
                        w="full"
                        fontSize="md"
                        fontWeight="semibold"
                        transition="all 0.15s"
                      >
                        Masuk
                      </Button>

                      <Link
                        fontSize="sm"
                        color="brand.fg"
                        fontWeight="medium"
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        Lupa kata sandi?
                      </Link>
                    </VStack>
                  </Stack>
                </form>
              )}
            </Form>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Memuat halaman masuk..." />}>
      <LoginContent />
    </Suspense>
  );
}
