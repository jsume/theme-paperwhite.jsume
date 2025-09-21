<script setup lang="ts">
import type { AwardsType } from '@jsume/schemas'

defineProps<{
  item: AwardsType[number]
}>()
</script>

<template>
  <div>
    <!-- title -->
    <span class="font-bold">{{ item.title }}</span>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration :start-date="item.date" />
      <span class="icon-text">
        <Icon name="mdi:trophy" />
        <span class="whitespace-nowrap">{{ item.awarder }}</span>
      </span>
    </div>
    <!-- summary -->
    <div v-if="item.summary" class="mt-1">
      {{ item.summary }}
    </div>
    <!-- description -->
    <Collapse v-if="item.description">
      <p class="text-neutral-600 font-light mt-1">
        {{ item.description }}
      </p>
    </Collapse>
  </div>
</template>
