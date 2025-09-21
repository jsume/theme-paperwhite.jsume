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
    case 'en':
      result = 'font-raleway'
      break
    case 'zh-CHS':
      result = 'font-notoSC'
      break
    case 'zh-CHT':
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
