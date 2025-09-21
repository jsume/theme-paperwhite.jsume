<script setup lang="ts">
const { publications } = storeToRefs(useMainStore())
</script>

<template>
  <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
    <PublicationItem v-for="item in publications" :key="`${item.name}${item.publisher}${item.releaseDate}`" :item />
  </div>
</template>
