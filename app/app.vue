<script setup lang="ts">
const mainStore = useMainStore()
const { locale } = useI18n()

await callOnce(mainStore.getJsumeData)

const stop = watchEffect(() => {
  mainStore.setJsumeDataByLocale(locale.value as LocaleCodeType)
})

const computedFontClass = computed(() => {
  let result = ''
  switch (locale.value) {
    case 'en-US':
      result = 'font-raleway'
      break
    case 'ja-JP':
      result = 'font-notoJP'
      break
    case 'zh-CN':
      result = 'font-notoSC'
      break
    case 'zh-HK':
    case 'zh-TW':
      result = 'font-notoST'
      break
  }
  return result
})

onUnmounted(() => {
  stop()
})
</script>

<template>
  <NuxtPage :class="computedFontClass" />
</template>
