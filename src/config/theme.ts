import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./theme/colors";
import { semanticTokens } from "./theme/semantic-tokens";
import { fonts, textStyles } from "./theme/typography";
import { radii, shadows } from "./theme/design-tokens";
import { layerStyles } from "./theme/layer-styles";
import { globalCss } from "./theme/global-styles";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
      radii,
      shadows,
    },
    semanticTokens,
    textStyles,
    layerStyles,
  },
  globalCss,
});

const theme = createSystem(defaultConfig, config);

export default theme;

export { tokens, getColorToken, getSemanticToken } from "./theme/token-exports";
