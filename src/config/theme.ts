import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Custom theme configuration with green accent colors
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Brand/Accent colors using green palette
        brand: {
          50: { value: "#f0fdf4" },
          100: { value: "#dcfce7" },
          200: { value: "#bbf7d0" },
          300: { value: "#86efac" },
          400: { value: "#4ade80" },
          500: { value: "#22c55e" },
          600: { value: "#16a34a" },
          700: { value: "#15803d" },
          800: { value: "#166534" },
          900: { value: "#14532d" },
          950: { value: "#052e16" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Brand semantic tokens for automatic light/dark mode
        brand: {
          solid: { value: "{colors.brand.600}" },
          contrast: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.gray.900}",
            },
          },
          fg: {
            value: {
              _light: "{colors.brand.600}",
              _dark: "{colors.brand.400}",
            },
          },
          muted: {
            value: {
              _light: "{colors.brand.100}",
              _dark: "{colors.brand.800}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.brand.50}",
              _dark: "{colors.brand.950}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.brand.200}",
              _dark: "{colors.brand.700}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.brand.600}",
              _dark: "{colors.brand.400}",
            },
          },
        },

        // Enhanced background tokens
        bg: {
          canvas: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.gray.950}",
            },
          },
          surface: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.gray.900}",
            },
          },
        },

        // Enhanced foreground tokens
        fg: {
          default: {
            value: {
              _light: "{colors.gray.900}",
              _dark: "{colors.gray.100}",
            },
          },
        },

        // Enhanced border tokens
        border: {
          default: {
            value: {
              _light: "{colors.gray.200}",
              _dark: "{colors.gray.700}",
            },
          },
        },
      },
    },
  },

  // Global CSS styles
  globalCss: {
    body: {
      bg: "bg.canvas",
      color: "fg.default",
      fontFamily: "Inter, system-ui, sans-serif",
      lineHeight: "1.6",
    },
    "*::placeholder": {
      color: "fg.muted",
    },
    "*::selection": {
      bg: "brand.muted",
      color: "fg.default",
    },
  },
});

// Create the theme system
const theme = createSystem(defaultConfig, config);

export default theme;

// Export theme tokens for easy use in components
export const themeTokens = {
  // Brand/Accent colors
  brand: {
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

  // Semantic tokens
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
      surface: "bg.surface",
    },
    fg: {
      default: "fg.default",
    },
    border: {
      default: "border.default",
    },
  },
} as const;
