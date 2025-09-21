<script setup lang="ts">
const { education } = storeToRefs(useMainStore())
</script>

<template>
  <div class="flex flex-col gap-6">
    <EducationItem
      v-for="item in education"
      :key="`${item.institution}${datesToDuration(item.startDate, item.endDate)}`"
      :item
    />
  </div>
</template>
