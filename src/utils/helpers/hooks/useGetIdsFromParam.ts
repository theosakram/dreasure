import { useParams } from "next/navigation";

type ParamTypes = {
  orgId?: string;
  userId?: string;
};

export const useGetIdsFromParam = () => {
  const { orgId, userId } = useParams<ParamTypes>();

  return { orgId, userId };
};
