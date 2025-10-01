export const tokens = {
  colors: {
    brand: {
      25: "brand.25",
      50: "brand.50",
      100: "brand.100",
      200: "brand.200",
      300: "brand.300",
      400: "brand.400",
      500: "brand.500",
      600: "brand.600",
      700: "brand.700",
      800: "brand.800",
      900: "brand.900",
      950: "brand.950",
    },
    sage: {
      25: "sage.25",
      50: "sage.50",
      100: "sage.100",
      200: "sage.200",
      300: "sage.300",
      400: "sage.400",
      500: "sage.500",
      600: "sage.600",
      700: "sage.700",
      800: "sage.800",
      900: "sage.900",
      950: "sage.950",
    },
    success: {
      25: "success.25",
      50: "success.50",
      100: "success.100",
      200: "success.200",
      300: "success.300",
      400: "success.400",
      500: "success.500",
      600: "success.600",
      700: "success.700",
      800: "success.800",
      900: "success.900",
      950: "success.950",
    },
    surface: {
      25: "surface.25",
      50: "surface.50",
      100: "surface.100",
      200: "surface.200",
      300: "surface.300",
      400: "surface.400",
      500: "surface.500",
      600: "surface.600",
      700: "surface.700",
      800: "surface.800",
      850: "surface.850",
      900: "surface.900",
      925: "surface.925",
      950: "surface.950",
    },
  },

  semantic: {
    brand: {
      solid: "brand.solid",
      contrast: "brand.contrast",
      fg: "brand.fg",
      muted: "brand.muted",
      subtle: "brand.subtle",
      emphasized: "brand.emphasized",
      focusRing: "brand.focusRing",
    },
    bg: {
      canvas: "bg.canvas",
      default: "bg.default",
      subtle: "bg.subtle",
      muted: "bg.muted",
      emphasized: "bg.emphasized",
      panel: "bg.panel",
      overlay: "bg.overlay",
    },
    fg: {
      default: "fg.default",
      muted: "fg.muted",
      subtle: "fg.subtle",
      inverted: "fg.inverted",
    },
    border: {
      default: "border.default",
      muted: "border.muted",
      subtle: "border.subtle",
      emphasized: "border.emphasized",
    },
    success: {
      solid: "success.solid",
      fg: "success.fg",
      muted: "success.muted",
    },
    accent: {
      default: "accent.default",
      subtle: "accent.subtle",
      emphasized: "accent.emphasized",
    },
  },

  textStyles: {
    display: "display",
    headline: "headline",
    title: "title",
    body: "body",
    caption: "caption",
  },

  layerStyles: {
    card: "card",
    cardElevated: "card.elevated",
    cardInteractive: "card.interactive",
    surface: "surface",
    surfaceRaised: "surface.raised",
    accentSubtle: "accent.subtle",
    accentSolid: "accent.solid",
  },
} as const;

export const getColorToken = (
  color: keyof typeof tokens.colors,
  shade: keyof typeof tokens.colors.brand,
) => {
  return tokens.colors[color][shade];
};

export const getSemanticToken = (
  category: keyof typeof tokens.semantic,
  token: string,
) => {
  const categoryTokens = tokens.semantic[category] as Record<string, string>;
  return categoryTokens[token];
};
