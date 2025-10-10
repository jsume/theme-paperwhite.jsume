<script setup lang="ts">
const { isFullscreen, isSupported, toggle } = useFullscreen()
</script>

<template>
  <button v-if="isSupported" class="menu-icon" @click="toggle">
    <Icon v-show="isFullscreen" name="material-symbols:fullscreen-exit-rounded" />
    <Icon v-show="!isFullscreen" name="material-symbols:fullscreen-rounded" />
  </button>
</template>
