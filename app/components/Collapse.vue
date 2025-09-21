<script setup lang="ts">
const props = defineProps<{
  notCollapse?: boolean
}>()
const isCollapsed = ref(!props.notCollapse)
</script>

<template>
  <template v-if="!isCollapsed">
    <slot />
  </template>
  <span
    class="icon-text text-xs text-neutral-400/70 font-bold mt-1 underline underline-offset-2 underline-dotted cursor-pointer"
    @click="isCollapsed = !isCollapsed"
  >
    <template v-if="isCollapsed">{{ $t('common.showMore') }}<Icon name="material-symbols:arrow-downward-rounded" /></template>
    <template v-else>{{ $t('common.showLess') }}<Icon name="material-symbols:arrow-upward-rounded" /></template>
  </span>
</template>
