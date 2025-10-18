<script setup lang="ts">
const { y } = useWindowScroll()
</script>

<template>
  <button
    v-show="y > 100"
    title="Back to top"
    class="color-white rounded-4 bg-black flex size-8 transform-translate-x-50% transition-500 transition-all items-center bottom-5 right-50% justify-center fixed"
    @click="y = 0"
  >
    <Icon name="material-symbols:arrow-upward-rounded" />
  </button>
</template>
