<script setup lang="ts">
const { work } = storeToRefs(useMainStore())
</script>

<template>
  <div class="flex flex-col gap-6">
    <WorkItem v-for="item in work" :key="item.company" :item />
  </div>
</template>
