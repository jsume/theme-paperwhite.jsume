<script setup lang="ts">
const { awards } = storeToRefs(useMainStore())
</script>

<template>
  <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
    <AwardItem
      v-for="item in awards"
      :key="`${item.title}${datesToDuration(item.date, '')}`"
      :item
    />
  </div>
</template>
