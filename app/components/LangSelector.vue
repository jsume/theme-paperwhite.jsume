<script setup>
const {
  availableLocaleCodes,
  availableJsumeDataCount,
} = storeToRefs(useMainStore())
const { locales } = useI18n()

const isHidden = ref(true)

const availableLocales = computed(() => locales.value.filter(lc => availableLocaleCodes.value.includes(lc.code)))

// handlers
function handleMouseEnter() {
  isHidden.value = false
}
function handleMouseLeave() {
  isHidden.value = true
}
</script>

<template>
  <div
    v-if="availableJsumeDataCount > 1"
    class="right-5 top-5 fixed"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="isHidden = !isHidden"
  >
    <div class="px-2 pb-2 cursor-pointer">
      <!-- <div i-material-symbols:translate class="cursor-pointer" /> -->
      <Icon name="material-symbols:translate" />
    </div>
    <div
      v-show="!isHidden"
      class="text-sm border rounded-md bg-white min-w-24 right-2 top-6 absolute overflow-hidden"
    >
      <NuxtLink
        v-for="lc in availableLocales"
        :key="lc.code"
        :to="$switchLocalePath(lc.code)"
        class="px-2 py-1 w-24 block hover:bg-neutral-100"
      >
        {{ lc.name }}
      </NuxtLink>
    </div>
  </div>
</template>
