<script setup lang="ts">
import type { WorkType } from '@jsume/schemas'

defineProps<{
  item: WorkType[number]
}>()
</script>

<template>
  <div>
    <!-- header -->
    <div class="section-item-header-info">
      <!-- company name -->
      <a
        v-if="item.website"
        :href="item.website"
        class="font-bold underline underline-0.0625rem underline-neutral-400 underline-offset-3 underline-dashed"
      >
        {{ item.company }}
      </a>
      <span v-else class="font-bold">
        {{ item.company }}
      </span>
      <!-- position -->
      <span class="text-neutral-400">
        {{ item.position }}
      </span>
    </div>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration :start-date="item.startDate" :end-date="item.endDate" />
      <Location v-if="item.location" :location="item.location" />
      <OnGoing v-if="!item.endDate" />
    </div>
    <!-- summary -->
    <div v-if="item.summary" class="mt-1">
      {{ item.summary }}
    </div>
    <!-- highlights -->
    <ul
      v-if="item.highlights && item.highlights.length"
      class="text-neutral-600 font-light mt-1 pl-8 list-circle"
    >
      <li v-for="highlight in item.highlights" :key="highlight">
        {{ highlight }}
      </li>
    </ul>
  </div>
</template>
