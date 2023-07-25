import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      // background
      'box-bg-base': 'bg-$c-box-bg-base',
      'box-bg-hover': 'bg-$c-box-bg-hover',
      'box-bg-disabled': 'bg-$c-box-bg-disabled',
      'box-bg-active': 'bg-$c-box-bg-active',
    },
  ],
  theme: {},
  presets: [
    presetUno({}),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter:400,600,800'],
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
