import { supabaseClient } from "@/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useCheckLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const supabase = supabaseClient();
  const router = useRouter();

  const checkLogin = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const returnTo = searchParams.get("returnTo") || "/orgs";
      router.replace(returnTo);
      return;
    }
  }, [router, searchParams, supabase]);

  useEffect(() => {
    setLoading(true);
    checkLogin().finally(() => setLoading(false));
  }, [checkLogin]);

  return { isLoading };
};
