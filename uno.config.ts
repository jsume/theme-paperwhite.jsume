import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  rules: [
    ['hidden', { visibility: 'hidden' }],
  ],
  theme: {
    font: {
      raleway: 'Raleway',
      notoJP: 'Noto Sans JP, Raleway',
      notoSC: 'Noto Sans SC, Raleway',
      notoTC: 'Noto Sans TC, Raleway',
    },
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
