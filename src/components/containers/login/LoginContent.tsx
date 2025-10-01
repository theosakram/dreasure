import { LoginContainer } from "@/components/containers/login";
import { useCheckLogin } from "@/utils/helpers/hooks/useCheckLogin";
import { useLogin } from "@/features/login/loginHooks";
import { FormField } from "@/components/custom/FormFIeld";
import { RiMailLine } from "react-icons/ri";
import { Form } from "@/components/custom/Form";
import { loginSchema } from "@/utils/forms/schemas/loginSchema";
import { Input, InputGroup, Loader, Stack } from "@chakra-ui/react";
import { PasswordFormInput } from "@/components/custom/PasswordFormInput";

export const LoginContent = () => {
  const { isLoading } = useCheckLogin();
  const { handleLogin } = useLogin();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LoginContainer>
      <LoginContainer.Header
        title="Selamat Datang"
        subtitle="Masuk ke akun Dreasury Anda untuk melanjutkan mengelola keuangan"
      />
      <Form
        schema={loginSchema}
        onSubmit={handleLogin}
        initialValues={{ email: "", password: "" }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <FormField<string> name="email" label="Email" isRequired>
                {({ input }) => (
                  <InputGroup startElement={<RiMailLine />}>
                    <Input
                      placeholder="Masukkan alamat email Anda"
                      size="md"
                      {...input}
                    />
                  </InputGroup>
                )}
              </FormField>
              <PasswordFormInput label="Password" />

              <LoginContainer.Footer submitting={submitting} />
            </Stack>
          </form>
        )}
      </Form>
    </LoginContainer>
  );
};
