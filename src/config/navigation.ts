import { IconType } from "react-icons";
import { FaSyncAlt, FaWallet } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";

export type NavigationItem = {
  href: string;
  label: string;
  icon: IconType;
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/cash",
    label: "Uang Kas",
    icon: FaWallet,
  },
  {
    href: "/revolving",
    label: "Uang Bergulir",
    icon: FaSyncAlt,
  },
  {
    href: "/members",
    label: "Anggota",
    icon: RiUserLine,
  },
];
