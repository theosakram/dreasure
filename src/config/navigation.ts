import { IconType } from "react-icons";
import { RiDashboardLine, RiUserLine } from "react-icons/ri";

export type NavigationItem = {
  href: string;
  label: string;
  icon: IconType;
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: RiDashboardLine,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: RiUserLine,
  },
];
