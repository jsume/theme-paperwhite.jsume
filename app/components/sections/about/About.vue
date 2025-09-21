<script setup lang="ts">
const mainStore = useMainStore()
const { basics } = storeToRefs(mainStore)
</script>

<template>
  <div>{{ basics?.summary }}</div>
</template>
