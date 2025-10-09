<script setup lang="ts">
const { isFullscreen, isSupported, toggle } = useFullscreen()
</script>

<template>
  <div v-if="isSupported" class="menu-icon" @click="toggle">
    <Icon v-if="isFullscreen" name="material-symbols:fullscreen-exit-rounded" />
    <Icon v-else name="material-symbols:fullscreen-rounded" />
  </div>
</template>
