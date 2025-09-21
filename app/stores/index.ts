import type { Jsume } from '@jsume/schemas'
import { jsumeSchema } from '@jsume/schemas'

export const useMainStore = defineStore('main', () => {
  // states
  const jsumeEnData = ref<Jsume>()
  const jsumeZhCHSData = ref<Jsume>()
  const jsumeZhCHTData = ref<Jsume>()
  const jsumeData = ref<Jsume>()

  // getters
  const localeCodeToJsumeData = {
    'en': jsumeEnData,
    'zh-CHS': jsumeZhCHSData,
    'zh-CHT': jsumeZhCHTData,
  }
  const availableJsumeDataCount = computed(() => Object.values(localeCodeToJsumeData).filter(d => d.value).length)
  const availableLocaleCodes = computed(() => Object.entries(localeCodeToJsumeData).filter(([_, d]) => d.value).map(([code, _]) => code))

  const basics = computed(() => jsumeData.value?.basics)
  const work = computed(() => jsumeData.value?.work)
  const projects = computed(() => jsumeData.value?.projects)
  const publications = computed(() => jsumeData.value?.publications)
  const education = computed(() => jsumeData.value?.education)
  const certificates = computed(() => jsumeData.value?.certificates)
  const awards = computed(() => jsumeData.value?.awards)
  const skills = computed(() => jsumeData.value?.skills)
  const languages = computed(() => jsumeData.value?.languages)

  // actions
  function setJsumeDataByLocale(localeCode: LocaleCodeType) {
    switch (localeCode) {
      case 'en':
        jsumeData.value = jsumeEnData.value
        break
      case 'zh-CHS':
        jsumeData.value = jsumeZhCHSData.value
        break
      case 'zh-CHT':
        jsumeData.value = jsumeZhCHTData.value
        break
      default:
        break
    }
  }

  async function getJsumeData() {
    const config = useRuntimeConfig()
    const urls = {
      en: config.public.jsumeDataEnUrl,
      zhCHS: config.public.jsumeDataZhCHSUrl,
      zhCHT: config.public.jsumeDataZhCHTUrl,
    }

    const tasks = Object.entries(urls)
      .filter(([_, url]) => !!url)
      .map(async ([lang, url]) => {
        try {
          const data = JSON.parse(await $fetch(url!))
          const parseResult = jsumeSchema.safeParse(data)
          if (parseResult.success) {
            if (lang === 'en')
              jsumeEnData.value = parseResult.data
            else if (lang === 'zhCHS')
              jsumeZhCHSData.value = parseResult.data
            else if (lang === 'zhCHT')
              jsumeZhCHTData.value = parseResult.data
          }
          else {
            console.error(parseResult.error)
          }
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (e) {
          // console.error(`Failed to fetch ${lang} data`, e)
        }
      })

    await Promise.allSettled(tasks) // 并行执行
  }

  return {
    // states
    jsumeData,
    jsumeEnData,
    jsumeZhCHSData,
    jsumeZhCHTData,

    // getters
    availableJsumeDataCount,
    availableLocaleCodes,
    basics,
    work,
    projects,
    publications,
    education,
    certificates,
    awards,
    skills,
    languages,

    // actions
    setJsumeDataByLocale,
    getJsumeData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
