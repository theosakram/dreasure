import { login } from "@/supabase/actions";
import { loginSchema } from "@/utils/forms/schemas/loginSchema";
import { useSearchParams } from "next/navigation";
import z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/orgs";
  const handleLogin = async (values: LoginFormValues) => {
    await login({
      email: values.email,
      password: values.password,
      returnTo,
    });
  };

  return { handleLogin };
};
