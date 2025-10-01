export const layerStyles = {
  card: {
    bg: "bg.panel",
    borderRadius: "xl",
    boxShadow: "sm",
    border: "1px solid",
    borderColor: "border.muted",
  },
  "card.elevated": {
    bg: "bg.panel",
    borderRadius: "xl",
    boxShadow: "lg",
    border: "1px solid",
    borderColor: "border.subtle",
  },
  "card.interactive": {
    bg: "bg.panel",
    borderRadius: "xl",
    boxShadow: "sm",
    border: "1px solid",
    borderColor: "border.muted",
    cursor: "pointer",
    transition: "all 0.2s",
    _hover: {
      boxShadow: "md",
      borderColor: "border.emphasized",
      transform: "translateY(-1px)",
    },
  },

  surface: {
    bg: "bg.subtle",
    borderRadius: "lg",
    border: "1px solid",
    borderColor: "border.muted",
  },
  "surface.raised": {
    bg: "bg.panel",
    borderRadius: "lg",
    boxShadow: "xs",
    border: "1px solid",
    borderColor: "border.subtle",
  },

  "accent.subtle": {
    bg: "accent.subtle",
    borderRadius: "lg",
    border: "1px solid",
    borderColor: "brand.emphasized",
  },
  "accent.solid": {
    bg: "brand.solid",
    color: "brand.contrast",
    borderRadius: "lg",
  },
} as const;
