import { Menu, Portal, IconButton, Icon } from "@chakra-ui/react";
import { LuEye, LuSettings, LuTrash2 } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";

export type ActionMenuOption = {
  label: string;
  value: "detail" | "edit" | "delete";
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
};

type ActionMenuProps = {
  onDetail?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customOptions?: ActionMenuOption[];
  trigger?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
};

export const ActionMenu = ({
  onDetail,
  onEdit,
  onDelete,
  customOptions,
  trigger,
  size = "sm",
}: ActionMenuProps) => {
  const defaultOptions: ActionMenuOption[] = [
    {
      label: "Lihat Detail",
      value: "detail",
      icon: <LuEye size={16} />,
      onClick: onDetail || (() => console.log("Detail clicked")),
    },
    ...(onEdit
      ? [
          {
            label: "Ubah",
            value: "edit" as const,
            icon: <LuSettings size={16} />,
            onClick: onEdit || (() => console.log("Edit clicked")),
          },
        ]
      : []),
    {
      label: "Hapus",
      value: "delete",
      icon: <LuTrash2 size={16} />,
      color: "fg.error",
      onClick: onDelete || (() => console.log("Delete clicked")),
    },
  ];

  const options = customOptions || defaultOptions;

  const defaultTrigger = (
    <IconButton
      variant="ghost"
      size={size}
      aria-label="Actions"
      color="fg.muted"
      _hover={{ bg: "brand.50", color: "brand.solid" }}
    >
      <Icon>
        <MdMoreVert />
      </Icon>
    </IconButton>
  );

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>{trigger || defaultTrigger}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {options.map((option) => (
              <Menu.Item
                key={option.value}
                value={option.value}
                color={option.color}
                _hover={
                  option.color === "fg.error"
                    ? { bg: "bg.error", color: "fg.error" }
                    : { bg: "bg.muted" }
                }
                onClick={option.onClick}
              >
                {option.icon}
                {option.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
