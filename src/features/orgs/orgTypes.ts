import { Wallet } from "../wallets/walletTypes";

export type Organization = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
};

type OrganizationMembershipRole = "admin" | "member" | "owner";

export type OrganizationMembership = {
  id: string;
  org_id: string;
  user_id: string;
  role: OrganizationMembershipRole;
  join_date: string;
  created_at: string;
};

export type OrganizationWithWallets = Organization & {
  wallets: Wallet[];
};
