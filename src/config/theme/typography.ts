export const fonts = {
  heading: { value: "Inter Variable, Inter, system-ui, sans-serif" },
  body: { value: "Inter Variable, Inter, system-ui, sans-serif" },
  mono: { value: "JetBrains Mono, Menlo, Monaco, Consolas, monospace" },
} as const;

export const textStyles = {
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
} as const;
