import type { Jsume } from '@jsume/schemas'
import { jsumeSchema } from '@jsume/schemas'

export const useMainStore = defineStore('main', () => {
  // states
  const jsumeEnUSData = ref<Jsume>()
  const jsumeJaJPData = ref<Jsume>()
  const jsumeZhCNData = ref<Jsume>()
  const jsumeZhHKData = ref<Jsume>()
  const jsumeZhTWData = ref<Jsume>()
  const jsumeData = ref<Jsume>()

  const drawingEnabled = ref(false)
  const menuOpened = ref(false)

  // getters
  const localeCodeToJsumeData: Record<LocaleCodeType, typeof jsumeData> = {
    'en-US': jsumeEnUSData,
    'ja-JP': jsumeJaJPData,
    'zh-CN': jsumeZhCNData,
    'zh-HK': jsumeZhHKData,
    'zh-TW': jsumeZhTWData,
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
    if (localeCodeToJsumeData[localeCode]) {
      jsumeData.value = localeCodeToJsumeData[localeCode].value
    }
  }

  async function getJsumeData() {
    const config = useRuntimeConfig()
    const { gistUsername, gistId } = config.public

    const baseUrl = 'https://gist.githubusercontent.com'

    const urls = (Object.keys(localeCodeToJsumeData) as LocaleCodeType[]).reduce((acc, code) => {
      return {
        ...acc,
        [code]: `${baseUrl}/${gistUsername}/${gistId}/raw/${code}.jsume.json`,
      }
    }, {} as Record<LocaleCodeType, string>)

    const tasks = Object.entries(urls)
      .filter(([_, url]) => !!url)
      .map(async ([code, url]) => {
        try {
          const data = JSON.parse(await $fetch(url!))
          const parseResult = jsumeSchema.safeParse(data)
          if (parseResult.success) {
            localeCodeToJsumeData[code as LocaleCodeType].value = parseResult.data
          }
          else {
            console.error(parseResult.error)
          }
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (e) {
          // console.error(`Failed to fetch ${code} data`, e)
        }
      })

    await Promise.allSettled(tasks) // 并行执行
  }

  return {
    // states
    jsumeData,
    jsumeEnData: jsumeEnUSData,
    jsumeJaData: jsumeJaJPData,
    jsumeZhCNData,
    jsumeZhHKData,
    jsumeZhTWData,

    drawingEnabled,
    menuOpened,

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
