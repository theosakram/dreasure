import { getPageRange } from "@/utils/helpers/getPageRange";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSelf = () => {
  return useQuery({
    queryKey: ["self"],
    queryFn: async () => {
      const { getSelf } = await import("./profileServices");
      return getSelf();
    },
  });
};

export const useGetProfiles = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { getProfiles } = await import("./profileServices");
      return getProfiles(getPageRange(page));
    },
  });
};

export const useGetProfileById = (id?: string) => {
  return useQuery({
    queryKey: ["profile_by_id", id],
    queryFn: async () => {
      const { getProfileById } = await import("./profileServices");

      return getProfileById(id || "");
    },
    enabled: !!id,
  });
};
