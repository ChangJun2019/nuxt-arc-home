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
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  devtools: { enabled: true },

})
