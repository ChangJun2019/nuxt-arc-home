// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    unsplashAccessKey: '',
  },

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@nuxthq/ui',
    '@nuxt/image',
    'dayjs-nuxt',
  ],

  // https://image.nuxtjs.org/configuration
  image: {

    domains: [
      'https://images.unsplash.com',
    ],
    alias: {
      unsplash: 'https://images.unsplash.com',
    },
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      'xxxl': 1920,
      '2k': 2560,
      '4k': 3840,
    },
    densities: [1, 2, 3],
    unsplash: {},
  },

  // https://github.com/fumeapp/dayjs
  dayjs: {
    plugins: ['timezone'],
    defaultTimezone: '',
  },

  macros: {},

  css: [
    '@unocss/reset/tailwind.css',
    '@/style/main.css',
  ],

  devtools: { enabled: true },

})
