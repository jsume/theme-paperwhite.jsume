<script setup lang="ts">
const { certificates } = storeToRefs(useMainStore())
</script>

<template>
  <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
    <CertificateItem v-for="item in certificates" :key="`${item.name}${item.expDate}`" :item />
  </div>
</template>
