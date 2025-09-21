<script setup lang="ts">
import type { PublicationsType } from '@jsume/schemas'

defineProps<{
  item: PublicationsType[number]
}>()
</script>

<template>
  <div>
    <!-- name -->
    <a
      v-if="item.url"
      :href="item.url"
      class="font-bold underline underline-0.0625rem underline-neutral-400 underline-offset-3 underline-dashed"
    >
      {{ item.name }}
    </a>
    <span v-else class="font-bold">
      {{ item.name }}
    </span>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration :start-date="item.releaseDate" />
      <span class="icon-text">
        <Icon name="material-symbols:book-2-rounded" />
        <span class="whitespace-nowrap">{{ item.publisher }}</span>
      </span>
    </div>
    <!-- summary -->
    <div v-if="item.summary" class="mt-1">
      {{ item.summary }}
    </div>
  </div>
</template>
