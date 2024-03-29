// https://nuxt.com/docs/api/configuration/nuxt-config
const dev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  runtimeConfig: {
    unsplashAccessKey: '',
    origin: '',
  },

  // https://nuxt.com/modules/umami
  extends: ['nuxt-umami'],

  routeRules: {
    '/': { ssr: false },
    '/api/unsplash/**': {
      security: {
        rateLimiter: {
          tokensPerInterval: 3,
          interval: 'hour',
          fireImmediately: true,
        },
      },
    },
  },

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@nuxthq/ui',
    '@nuxt/image',
    'dayjs-nuxt',
    'nuxt-security',
  ],

  security: {
    headers: {
      crossOriginEmbedderPolicy: dev ? 'unsafe-none' : 'require-corp',
      crossOriginResourcePolicy: 'same-site',
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', 'images.unsplash.com'],
      },
      referrerPolicy: 'origin-when-cross-origin',
    },
    xssValidator: {
      stripIgnoreTag: true,
    },
  },

  // https://image.nuxtjs.org/configuration
  image: {

    domains: [
      'https://images.unsplash.com',
    ],
    alias: {
      unsplash: 'https://images.unsplash.com',
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
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
    '@/style/global.css',
    '@/style/var.css',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-en',
      },
      title: 'Elegant Tab',
      meta: [
        { name: 'author', content: 'ChangJun' },
        { name: 'description', content: 'a elegant tab page' },
        { name: 'og:title', content: 'Elegant Tab' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'https://52chinaweb.com/' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/tab-apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/tab-favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/tab-favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
