<script setup lang="ts">
const emitKeyStroke = inject<(type: KeyStrokeEventType, data?: any) => void>('emitKeyStroke')!

function handleClick() {
  emitKeyStroke(KeyStrokeEventType['DRAW:TOGGLE'])
}
</script>

<template>
  <button class="menu-icon" @click="handleClick()">
    <Icon name="material-symbols:draw-outline-rounded" />
  </button>
</template>
