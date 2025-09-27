import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filterEmptyObjectKeys } from "../filterEmptyObjectKeys";
import { matchPI } from "../match";

export type UseShallowPushProps = {
  type?: "push" | "replace";
};

export const useShallowPush = ({ type = "push" }: UseShallowPushProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = Object.fromEntries(searchParams.entries());

  const shallowPush = (query?: Record<string, string | number>) => {
    const target = query
      ? `${pathname}?${new URLSearchParams(
          filterEmptyObjectKeys({ ...params, ...query }),
        )}`
      : pathname;

    return matchPI({ _tag: type })({
      push: () => router.push(target),
      _: () => router.replace(target),
    });
  };

  return { shallowPush };
};
