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
      notoSC: 'Noto Sans SC',
      notoTC: 'Noto Sans TC',
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
