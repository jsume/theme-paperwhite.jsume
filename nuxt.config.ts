/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Resume created with Jsume' },
        { property: 'og:title', content: 'Resume' },
        { property: 'og:image', content: 'https://avatars.githubusercontent.com/u/191219966' },
        { property: 'og:description', content: 'Resume created with Jsume' },
        { property: 'twitter:image', content: 'https://avatars.githubusercontent.com/u/191219966' },
        { property: 'twitter:card', content: 'summary' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      base: { target: '_blank' },
      noscript: [
        { textContent: 'JavaScript is required' },
      ],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/base.css',
  ],
  runtimeConfig: {
    public: {
      // env
      gistId: '',
      githubAccessToken: '',
    },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  fonts: {
    defaults: {
      weights: ['200 800'],
    },
    families: [
      { name: 'Raleway', provider: 'google' },
      { name: 'Noto Sans JP', provider: 'google' },
      { name: 'Noto Sans SC', provider: 'google' },
      { name: 'Noto Sans ST', provider: 'google' },
    ],
  },
  // https://simplelocalize.io/data/locales/
  i18n: {
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'en-US',
    locales: [
      { code: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ja-JP', name: '日本語', file: 'ja-JP.json' },
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'zh-HK', name: '繁體中文(HK)', file: 'zh-HK.json' },
      { code: 'zh-TW', name: '繁體中文(TW)', file: 'zh-TW.json' },
    ],
  },
})
