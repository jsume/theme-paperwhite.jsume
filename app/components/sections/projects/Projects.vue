<script setup lang="ts">
const { projects } = storeToRefs(useMainStore())
</script>

<template>
  <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
    <ProjectItem v-for="item in projects" :key="item.name" :item />
  </div>
</template>
