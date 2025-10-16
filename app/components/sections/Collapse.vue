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
    {{ isCollapsed ? $t('common.showMore') : $t('common.showLess') }}<Icon v-show="isCollapsed" name="material-symbols:arrow-downward-rounded" /><Icon v-show="!isCollapsed" name="material-symbols:arrow-upward-rounded" />
  </span>
</template>
