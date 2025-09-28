import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Professional UI/UX theme with sophisticated green accent system
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Primary brand palette - Sophisticated emerald green with perfect harmony
        brand: {
          25: { value: "#f7fef9" },
          50: { value: "#ecfdf5" },
          100: { value: "#d1fae5" },
          200: { value: "#a7f3d0" },
          300: { value: "#6ee7b7" },
          400: { value: "#34d399" },
          500: { value: "#10b981" },
          600: { value: "#059669" },
          700: { value: "#047857" },
          800: { value: "#065f46" },
          900: { value: "#064e3b" },
          950: { value: "#022c22" },
        },

        // Secondary palette - Complementary sage green
        sage: {
          25: { value: "#fafcfb" },
          50: { value: "#f3f6f4" },
          100: { value: "#e3ebe5" },
          200: { value: "#c7d6cb" },
          300: { value: "#9db5a5" },
          400: { value: "#6b9177" },
          500: { value: "#4d7759" },
          600: { value: "#3c5e47" },
          700: { value: "#314d3a" },
          800: { value: "#293f31" },
          900: { value: "#22352a" },
          950: { value: "#111d16" },
        },

        // Success palette enhancement
        success: {
          25: { value: "#f6fef9" },
          50: { value: "#eafef2" },
          100: { value: "#d3fce3" },
          200: { value: "#aaf7c8" },
          300: { value: "#73f0a0" },
          400: { value: "#42e574" },
          500: { value: "#22c55e" },
          600: { value: "#16a34a" },
          700: { value: "#15803d" },
          800: { value: "#166534" },
          900: { value: "#14532d" },
          950: { value: "#052e16" },
        },

        // Surface grays optimized for both themes
        surface: {
          25: { value: "#fefefe" },
          50: { value: "#f8f9fa" },
          100: { value: "#f1f3f4" },
          200: { value: "#e8eaed" },
          300: { value: "#dadce0" },
          400: { value: "#9aa0a6" },
          500: { value: "#5f6368" },
          600: { value: "#3c4043" },
          700: { value: "#2d2d2d" },
          800: { value: "#242424" },
          850: { value: "#1e1e1e" },
          900: { value: "#181818" },
          925: { value: "#121212" },
          950: { value: "#0a0a0a" },
        },
      },

      fonts: {
        heading: { value: "Inter Variable, Inter, system-ui, sans-serif" },
        body: { value: "Inter Variable, Inter, system-ui, sans-serif" },
        mono: { value: "JetBrains Mono, Menlo, Monaco, Consolas, monospace" },
      },

      radii: {
        xs: { value: "0.125rem" },
        sm: { value: "0.25rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        "2xl": { value: "1rem" },
        "3xl": { value: "1.5rem" },
      },

      shadows: {
        xs: { value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
        sm: {
          value:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
        md: {
          value:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
        lg: {
          value:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },
        xl: {
          value:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        },
        "2xl": { value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
        inner: { value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" },
      },
    },

    semanticTokens: {
      colors: {
        // Primary brand semantic tokens
        brand: {
          solid: {
            value: {
              _light: "{colors.brand.600}",
              _dark: "{colors.brand.500}",
            },
          },
          contrast: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.surface.950}",
            },
          },
          fg: {
            value: {
              _light: "{colors.brand.700}",
              _dark: "{colors.brand.300}",
            },
          },
          muted: {
            value: {
              _light: "{colors.brand.50}",
              _dark: "{colors.brand.900}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.brand.25}",
              _dark: "{colors.brand.950}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.brand.100}",
              _dark: "{colors.brand.800}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.400}",
            },
          },
        },

        // Enhanced background system
        bg: {
          canvas: {
            value: {
              _light: "{colors.surface.25}",
              _dark: "{colors.surface.950}",
            },
          },
          default: {
            value: {
              _light: "{colors.surface.50}",
              _dark: "{colors.surface.925}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.surface.100}",
              _dark: "{colors.surface.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.surface.200}",
              _dark: "{colors.surface.850}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.surface.300}",
              _dark: "{colors.surface.800}",
            },
          },
          panel: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.surface.900}",
            },
          },
          overlay: {
            value: {
              _light: "rgba(248, 249, 250, 0.85)",
              _dark: "rgba(10, 10, 10, 0.85)",
            },
          },
        },

        // Enhanced foreground system
        fg: {
          default: {
            value: {
              _light: "{colors.surface.900}",
              _dark: "{colors.surface.25}",
            },
          },
          muted: {
            value: {
              _light: "{colors.surface.600}",
              _dark: "{colors.surface.300}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.surface.500}",
              _dark: "{colors.surface.400}",
            },
          },
          inverted: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.surface.950}",
            },
          },
        },

        // Enhanced border system
        border: {
          default: {
            value: {
              _light: "{colors.surface.300}",
              _dark: "{colors.surface.700}",
            },
          },
          muted: {
            value: {
              _light: "{colors.surface.200}",
              _dark: "{colors.surface.800}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.surface.100}",
              _dark: "{colors.surface.850}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.surface.400}",
              _dark: "{colors.surface.600}",
            },
          },
        },

        // Status colors
        success: {
          solid: {
            value: {
              _light: "{colors.success.600}",
              _dark: "{colors.success.500}",
            },
          },
          fg: {
            value: {
              _light: "{colors.success.700}",
              _dark: "{colors.success.300}",
            },
          },
          muted: {
            value: {
              _light: "{colors.success.50}",
              _dark: "{colors.success.900}",
            },
          },
        },

        // Interactive states
        accent: {
          default: {
            value: {
              _light: "{colors.brand.600}",
              _dark: "{colors.brand.400}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.sage.100}",
              _dark: "{colors.sage.900}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.sage.200}",
              _dark: "{colors.sage.800}",
            },
          },
        },
      },

      shadows: {
        xs: {
          value: {
            _light: "{shadows.xs}",
            _dark: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
          },
        },
        sm: {
          value: {
            _light: "{shadows.sm}",
            _dark:
              "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
          },
        },
        md: {
          value: {
            _light: "{shadows.md}",
            _dark:
              "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
          },
        },
        lg: {
          value: {
            _light: "{shadows.lg}",
            _dark:
              "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
          },
        },
      },
    },

    textStyles: {
      // Enhanced typography system
      display: {
        fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
        fontWeight: "800",
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
      },
      headline: {
        fontSize: { base: "2xl", md: "3xl" },
        fontWeight: "700",
        lineHeight: "1.2",
        letterSpacing: "-0.01em",
      },
      title: {
        fontSize: { base: "xl", md: "2xl" },
        fontWeight: "600",
        lineHeight: "1.3",
      },
      body: {
        fontSize: "md",
        fontWeight: "400",
        lineHeight: "1.6",
      },
      caption: {
        fontSize: "sm",
        fontWeight: "500",
        lineHeight: "1.5",
        color: "fg.muted",
      },
    },

    layerStyles: {
      // Card variations
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

      // Surface variations
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

      // Accent surfaces
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
    },
  },

  // Enhanced global styles
  globalCss: {
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
    // Smooth transitions for theme switching
    "*, *::before, *::after": {
      borderColor: "inherit",
    },
    // Enhanced scrollbar styling
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
  },
});

// Create the theme system
const theme = createSystem(defaultConfig, config);

export default theme;

// Export theme tokens for easy component usage
export const tokens = {
  // Color palettes
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

  // Semantic tokens for context-aware theming
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

  // Text styles
  textStyles: {
    display: "display",
    headline: "headline",
    title: "title",
    body: "body",
    caption: "caption",
  },

  // Layer styles for consistent component styling
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

// Utility functions for theme usage
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
