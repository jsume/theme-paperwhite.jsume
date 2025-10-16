<script setup lang="ts">
const { isFullscreen, isSupported, toggle } = useFullscreen()

// event bus
const onKeyStroke = inject<(type: KeyStrokeEventType, cb: (data: any) => any) => (() => void)>('onKeyStroke')!
const unsub = onKeyStroke(KeyStrokeEventType['FULLSCREEN:TOGGLE'], () => {
  if (isSupported)
    toggle()
})

onUnmounted(() => {
  unsub && unsub()
})
</script>

<template>
  <button v-show="isSupported" class="menu-icon" @click="toggle">
    <Icon v-show="isFullscreen" name="material-symbols:fullscreen-exit-rounded" />
    <Icon v-show="!isFullscreen" name="material-symbols:fullscreen-rounded" />
  </button>
</template>
