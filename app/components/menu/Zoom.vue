<script setup lang="ts">
const htmlRef = ref<HTMLElement | null>(null)

function zoom(delta: -1 | 0 | 1) {
  if (!htmlRef.value)
    return

  if (delta === 0) {
    htmlRef.value.style.fontSize = ''
    return
  }

  const style = getComputedStyle(htmlRef.value)
  const fontSize = Number.parseFloat(style.fontSize)

  if (Number.isNaN(fontSize))
    return

  const newFontSize = fontSize + delta

  if (newFontSize < 12 || newFontSize > 24)
    return

  htmlRef.value.style.fontSize = `${newFontSize}px`
}

// event bus
const onKeyStroke = inject<(type: KeyStrokeEventType, cb: (data: any) => any) => (() => void)>('onKeyStroke')!
const unsub = onKeyStroke(KeyStrokeEventType.ZOOM, (data) => {
  zoom(data)
})

onMounted(() => {
  htmlRef.value = document.querySelector('html')
})

onUnmounted(() => {
  unsub && unsub()
})
</script>

<template>
  <div class="menu-icon">
    <button title="Zoom in" @click="() => zoom(1)">
      <Icon name="mdi:plus" />
    </button>
    <button title="Reset zoom" @click="() => zoom(0)">
      <Icon name="mdi:refresh" />
    </button>
    <button title="Zoom out" @click="() => zoom(-1)">
      <Icon name="mdi:minus" />
    </button>
  </div>
</template>

<style scoped>
.menu-icon {
  justify-content: space-around;
  @apply h-18;
}
</style>
