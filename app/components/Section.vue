<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="pb-6 pt-1.5">
    <h3 class="text-white font-bold mb-4 px-2 py-0.5 rounded bg-dark-500 inline-block">
      {{ title }}
    </h3>
    <div class="pl-6 lt-sm:pl-2">
      <slot />
    </div>
  </section>
</template>
