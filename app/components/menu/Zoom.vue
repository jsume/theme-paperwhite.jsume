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

onMounted(() => {
  htmlRef.value = document.querySelector('html')
})
</script>

<template>
  <div class="menu-icon">
    <Icon class="cursor-pointer" name="mdi:plus" @click="() => zoom(1)" />
    <Icon class="cursor-pointer" name="mdi:refresh" @click="() => zoom(0)" />
    <Icon class="cursor-pointer" name="mdi:minus" @click="() => zoom(-1)" />
  </div>
</template>

<style scoped>
.menu-icon {
  justify-content: space-around;
  @apply h-18;
}
</style>
