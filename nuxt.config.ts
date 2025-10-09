/* eslint-disable node/prefer-global/process */
import { generateGistUrl } from './shared/utils/'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@formkit/auto-animate/nuxt',
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
      jsumeDataEnUrl: generateGistUrl(process.env.NUXT_PUBLIC_GIST_USERNAME, process.env.NUXT_PUBLIC_GIST_ID, 'en.jsume.json'),
      jsumeDataZhCHSUrl: generateGistUrl(process.env.NUXT_PUBLIC_GIST_USERNAME, process.env.NUXT_PUBLIC_GIST_ID, 'zh-CHS.jsume.json'),
      jsumeDataZhCHTUrl: generateGistUrl(process.env.NUXT_PUBLIC_GIST_USERNAME, process.env.NUXT_PUBLIC_GIST_ID, 'zh-CHT.jsume.json'),
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
      { name: 'Noto Sans SC', provider: 'google' },
      { name: 'Noto Sans ST', provider: 'google' },
    ],
  },
  i18n: {
    defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh-CHS', name: '简体中文', file: 'zh-CHS.json' },
      { code: 'zh-CHT', name: '繁體中文', file: 'zh-CHT.json' },
    ],
  },
})
