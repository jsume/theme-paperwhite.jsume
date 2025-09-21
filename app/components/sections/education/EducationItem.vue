<script setup lang="ts">
import type { EducationType } from '@jsume/schemas'

defineProps<{
  item: EducationType[number]
}>()
</script>

<template>
  <div>
    <!-- degree -->
    <span class="font-bold">{{ item.degree }}</span>
    <!-- major & institution -->
    <div class="section-item-header-info">
      <span>{{ item.major }}, {{ item.institution }}</span>
    </div>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration :start-date="item.startDate" :end-date="item.endDate" />
      <Location v-if="item.location" :location="item.location" />
      <OnGoing v-if="!item.endDate" />
    </div>
    <!-- activities -->
    <Collapse v-if="item.activities?.length">
      <ul class="text-neutral-600 font-light mt-1 pl-8 list-circle">
        <li v-for="activity in item.activities" :key="activity">
          {{ activity }}
        </li>
      </ul>
    </Collapse>
    <!-- courses -->
    <div v-if="item.courses" class="mt-2 flex flex-wrap gap-1 items-center">
      <Tag v-for="course in item.courses" :key="course">
        {{ course }}
      </Tag>
    </div>
  </div>
</template>
