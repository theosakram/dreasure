export const semanticTokens = {
  colors: {
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
        _dark: "0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)",
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
} as const;
