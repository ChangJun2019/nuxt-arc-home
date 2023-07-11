// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@nuxthq/ui',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  devtools: { enabled: true },

})
