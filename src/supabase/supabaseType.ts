export type SupabaseSignUp = {
  email: string;
  password: string;
};

export type SupabaseLogin = SupabaseSignUp & {
  returnTo?: string;
};
