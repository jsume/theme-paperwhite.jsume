<script setup lang="ts">
const { drawingEnabled } = storeToRefs(useMainStore())
const emitKeyStroke = inject<(type: KeyStrokeEventType, data?: any) => void>('emitKeyStroke')!

function handleClick() {
  emitKeyStroke(KeyStrokeEventType['DRAW:TOGGLE'])
}
</script>

<template>
  <button
    title="Toggle drawing mode"
    class="menu-icon"
    :class="{ active: drawingEnabled }"
    @click="handleClick()"
  >
    <Icon name="material-symbols:draw-outline-rounded" />
  </button>
</template>
