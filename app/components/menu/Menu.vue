<script setup lang="ts">
const isHidden = ref(true)

const target = useTemplateRef('target')

onClickOutside(target, () => isHidden.value = true)

onMounted(() => {
  autoAnimate(document.querySelector('.menu-box')!)
})
</script>

<template>
  <div
    ref="target"
    v-auto-animate
    class="flex shrink-0 flex-col gap-3"
  >
    <div
      class="menu-box shrink-0 size-8 cursor-pointer"
      @click="isHidden = !isHidden"
    >
      <Icon name="mdi:apps" class="color-white" />
    </div>
    <div
      v-if="!isHidden"
      class="menu-box p-1 gap-3 w-8"
    >
      <Fullscreen />
      <Zoom />
      <LangSelector />
    </div>
  </div>
</template>

<style>
.menu-box {
  @apply rounded-4 bg-black flex flex-col items-center justify-center drop-shadow-md/40;
}

.menu-icon {
  @apply color-white bg-neutral-400/30 rounded-3 size-6 flex flex-col items-center justify-center text-sm cursor-pointer;
}
</style>
