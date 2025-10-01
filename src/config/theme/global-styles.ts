export const globalCss = {
  "*": {
    borderColor: "border.default",
  },
  html: {
    scrollBehavior: "smooth",
  },
  body: {
    bg: "bg.canvas",
    color: "fg.default",
    fontFamily: "body",
    lineHeight: "1.6",
    fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
    fontOpticalSizing: "auto",
  },
  "*::placeholder": {
    color: "fg.subtle",
    opacity: 1,
  },
  "*::selection": {
    bg: "brand.muted",
    color: "brand.fg",
  },
  ":focus-visible": {
    outline: "2px solid",
    outlineColor: "brand.focusRing",
    outlineOffset: "2px",
  },
  "*, *::before, *::after": {
    borderColor: "inherit",
  },
  "::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "::-webkit-scrollbar-track": {
    bg: "bg.subtle",
  },
  "::-webkit-scrollbar-thumb": {
    bg: "border.emphasized",
    borderRadius: "full",
    _hover: {
      bg: "fg.muted",
    },
  },
} as const;
