<script setup>
const {
  availableLocaleCodes,
  availableJsumeDataCount,
} = storeToRefs(useMainStore())
const { locales } = useI18n()
const router = useRouter()

const availableLocales = computed(() => locales.value.filter(lc => availableLocaleCodes.value.includes(lc.code)))
</script>

<template>
  <div
    v-if="availableJsumeDataCount > 1"
    class="relative"
  >
    <button class="menu-icon" @click="handleClick">
      <Icon name="material-symbols:translate" />
    </button>
    <select
      class="opacity-0 size-6 cursor-pointer left-0 top-0 absolute overflow-hidden"
      @change="(e) => router.push($switchLocalePath(e.target.value) || '/')"
    >
      <option
        v-for="lc in availableLocales"
        :key="lc.code"
        class="text-xs"
        :value="lc.code"
        :selected="lc.code === $i18n.locale"
      >
        {{ lc.name }}
      </option>
    </select>
  </div>
</template>
