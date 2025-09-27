import { useQuery } from "@tanstack/react-query";

export const useGetProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { getProfiles } = await import("./profileServices");
      return getProfiles();
    },
  });
};

export const useGetProfileById = (id: string) => {
  return useQuery({
    queryKey: ["profile_by_id", id],
    queryFn: async () => {
      const { getProfileById } = await import("./profileServices");

      return getProfileById(id);
    },
  });
};
