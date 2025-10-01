"use client";

import { Suspense } from "react";
import { Loader } from "@/components/custom/Loader";
import { LoginContent } from "@/components/containers/login/LoginContent";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginContent />
    </Suspense>
  );
}
