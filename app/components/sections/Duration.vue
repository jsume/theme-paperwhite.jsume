<script setup lang="ts">
import type { DateType, EndDateType } from '@jsume/schemas'

const props = defineProps<{
  startDate: DateType
  endDate?: EndDateType
}>()

const duration = computed(() => {
  return datesToDuration(
    props.startDate,
    props.endDate === undefined
      ? undefined
      : (props.endDate || $t('common.now')),
  )
})
</script>

<template>
  <span v-if="startDate" class="icon-text">
    <Icon name="material-symbols:date-range" />
    <span class="whitespace-nowrap">{{ duration }}</span>
  </span>
</template>
