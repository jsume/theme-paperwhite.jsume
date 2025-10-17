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
  const localeCodeToJsumeData = LOCALE_CODES
    .map((code) => {
      switch (code) {
        case 'ja-JP': return [code, jsumeJaJPData] as const
        case 'zh-CN': return [code, jsumeZhCNData] as const
        case 'zh-HK': return [code, jsumeZhHKData] as const
        case 'zh-TW': return [code, jsumeZhTWData] as const
      }
      return ['en-US', jsumeEnUSData] as const
    })
    .reduce((acc, [code, data]) => {
      return {
        ...acc,
        [code]: data,
      } as const
    }, {} as Record<LocaleCodeType, typeof jsumeData>)

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
    const {
      gistId,
      githubAccessToken,
    } = useRuntimeConfig().public

    const hasGithubAccessToken = !!githubAccessToken

    const url = `${GITHUB_API_BASE_URL}/gists/${gistId}`
    const resp: any = await $fetch(url, {
      headers: {
        'X-GitHub-Api-Version': GITHUB_API_VERSION || '2022-11-28',
        'Authorization': hasGithubAccessToken ? `Bearer ${githubAccessToken}` : '',
      },
    })
    const files = resp.files

    Object.keys(localeCodeToJsumeData).forEach((code) => {
      if (files[`${code}.jsume.json`]) {
        const jsonParseResult = safeParseJson<any>(files[`${code}.jsume.json`].content)
        if (jsonParseResult.success) {
          const schemaParseResult = jsumeSchema.safeParse(jsonParseResult.data)
          if (schemaParseResult.success) {
            localeCodeToJsumeData[code as LocaleCodeType].value = schemaParseResult.data
          }
        }
      }
    })
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
