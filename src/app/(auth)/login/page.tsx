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
    bg="linear-gradient(135deg, brand.50 0%, brand.100 50%, sage.50 100%)"
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
          borderColor="brand.100"
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
      <Text color="brand.700" fontSize="lg" fontWeight="medium">
        {text}
      </Text>
    </VStack>
  </Box>
);

const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <VStack gap={3} textAlign="center">
    {/* Brand Icon */}
    <Box
      p={3}
      borderRadius="xl"
      bg="linear-gradient(135deg, brand.400, brand.600)"
      shadow="lg"
      border="2px solid"
      borderColor="brand.300"
    >
      <Icon size="xl" color="green">
        <TbMoneybag />
      </Icon>
    </Box>

    {/* Lock Icon */}
    <Box
      p={2}
      borderRadius="lg"
      bg="linear-gradient(135deg, brand.500, brand.600)"
      shadow="md"
    >
      <Icon size="md" color="white">
        <RiLockLine />
      </Icon>
    </Box>

    <VStack gap={1}>
      <Heading size="lg" color="fg.default" fontWeight="bold">
        {title}
      </Heading>
      <Text color="fg.muted" fontSize="md" maxW="sm" lineHeight="1.4">
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
          <Icon color="fg.subtle" size="lg">
            {icon}
          </Icon>
        }
      >
        <Input
          {...input}
          type={type}
          placeholder={placeholder}
          size="xl"
          bg="bg.subtle"
          border="2px solid"
          borderColor="border.subtle"
          _hover={{
            borderColor: "brand.300",
            bg: "bg.canvas",
          }}
          _focus={{
            borderColor: "brand.500",
            shadow: "0 0 0 1px var(--chakra-colors-brand-500)",
            bg: "bg.canvas",
          }}
          fontSize="md"
          h="48px"
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
            <Icon color="fg.subtle" size="lg">
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
              <Icon size="lg">
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </Icon>
            </Button>
          }
        >
          <Input
            {...input}
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi Anda"
            size="xl"
            bg="bg.subtle"
            border="2px solid"
            borderColor="border.subtle"
            _hover={{
              borderColor: "brand.300",
              bg: "bg.canvas",
            }}
            _focus={{
              borderColor: "brand.500",
              shadow: "0 0 0 1px var(--chakra-colors-brand-500)",
              bg: "bg.canvas",
            }}
            fontSize="md"
            h="48px"
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
        const returnTo = searchParams.get("returnTo") || "/cash";
        router.replace(returnTo);
        return;
      }

      setIsLoading(false);
    };

    checkUser();
  }, [router, searchParams]);

  const handleLogin = async (values: LoginFormValues) => {
    const returnTo = searchParams.get("returnTo") || "/cash";

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
      bg="linear-gradient(135deg, brand.50 0%, brand.100 50%, sage.50 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root
        maxW="lg"
        w="full"
        variant="elevated"
        shadow="2xl"
        rounded="3xl"
        overflow="hidden"
        border="1px solid"
        borderColor="border.subtle"
        bg="bg.canvas"
      >
        <Card.Body p={8}>
          <Stack gap={6}>
            <FormHeader
              title="Selamat Datang Kembali"
              subtitle="Masuk ke akun Dreasure Anda untuk melanjutkan mengelola keuangan"
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

                    <VStack gap={3} pt={1}>
                      <Link
                        alignSelf="flex-end"
                        fontSize="sm"
                        color="brand.600"
                        fontWeight="medium"
                        _hover={{
                          color: "brand.700",
                          textDecoration: "underline",
                        }}
                      >
                        Lupa kata sandi?
                      </Link>

                      <Button
                        size="xl"
                        colorPalette="brand"
                        onClick={handleSubmit}
                        loading={submitting}
                        loadingText="Sedang masuk..."
                        type="submit"
                        w="full"
                        h="48px"
                        fontSize="lg"
                        fontWeight="semibold"
                        shadow="lg"
                        _hover={{
                          transform: "translateY(-2px)",
                          shadow: "xl",
                        }}
                        transition="all 0.2s"
                      >
                        Masuk
                      </Button>
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
