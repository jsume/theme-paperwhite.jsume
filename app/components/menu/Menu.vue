<script setup lang="ts">
const isHidden = ref(true)
</script>

<template>
  <div
    class="group flex shrink-0 flex-col gap-3 right-10 top-10 fixed lt-sm:(right-5 top-5)"
    @mouseenter="isHidden = false"
    @mouseleave="isHidden = true"
  >
    <button
      class="rounded-4 flex shrink-0 flex-col size-8 items-center justify-center group-hover:(color-white bg-black)"
      @click="isHidden = !isHidden"
    >
      <Icon name="mdi:apps" />
    </button>
    <div
      v-if="!isHidden"
      class="p-1 rounded-4 bg-black flex flex-col gap-3 w-8 items-center justify-center"
    >
      <Fullscreen />
      <Zoom />
      <LangSelector />
    </div>
  </div>
</template>

<style>
.menu-icon {
  @apply color-white bg-neutral-400/30 rounded-3 size-6 flex flex-col items-center justify-center text-sm;
}
</style>
