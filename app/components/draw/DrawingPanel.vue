<script setup lang="ts">
defineProps<{
  colors: string[]
  canUndo: boolean
  canRedo: boolean
}>()

const emit = defineEmits<{
  (event: 'clear'): void
  (event: 'undo'): void
  (event: 'redo'): void
  (event: 'close'): void
}>()

const color = defineModel<string>('color', {
  type: String,
  required: true,
})
const size = defineModel<number>('size', {
  type: Number,
  required: true,
})
const mode = defineModel<string>('mode', {
  type: String,
})
const arrowEnd = defineModel<boolean>('arrow-end', {
  type: Boolean,
})

const panel = useTemplateRef<HTMLDivElement>('panel')
const { style } = useDraggable(panel, {
  exact: true,
  initialValue: { x: 0, y: 0 },
  capture: true,
  preventDefault: true,
})
</script>

<template>
  <div
    ref="panel"
    class="text-white m-2 p-2 rounded-xl bg-black flex flex-wrap gap-x-2 gap-y-1 cursor-move shadow-black/30 shadow-xl items-center fixed z-30 touch-none"
    :style="style"
  >
    <!-- mode -->
    <button :class="{ active: mode === 'draw' }" class="tool-button" @click="mode = 'draw'">
      <Icon name="material-symbols:edit-outline" />
    </button>
    <button :class="{ active: mode === 'line' && !arrowEnd }" class="tool-button" @click="mode = 'line';arrowEnd = false">
      <Icon name="mdi:slash-forward" />
    </button>
    <button :class="{ active: mode === 'line' && arrowEnd }" class="tool-button" @click="mode = 'line';arrowEnd = true">
      <Icon name="material-symbols:line-end-arrow-notch" />
    </button>
    <button :class="{ active: mode === 'rectangle' }" class="tool-button" @click="mode = 'rectangle'">
      <Icon name="material-symbols:square-outline" />
    </button>
    <button :class="{ active: mode === 'ellipse' }" class="tool-button" @click="mode = 'ellipse'">
      <Icon name="mdi:circle-outline" />
    </button>
    <button :class="{ active: mode === 'eraseLine' }" class="tool-button" @click="mode = 'eraseLine'">
      <Icon name="material-symbols:ink-eraser-outline" />
    </button>
    <!-- separator -->
    <div class="separator" />
    <!-- size -->
    <Scrubber v-model="size" class="w-28" :min="1" :max="10" />
    <!-- colors -->
    <button
      v-for="_color in colors"
      :key="_color"
      :class="{ active: _color === color }"
      class="color-button"
      @click="() => color = _color"
    >
      <div :style="{ background: _color }" class="size-6" border="2 dark:(light-900 opacity-50) rounded-full" />
    </button>
    <!-- separator -->
    <div class="separator" />
    <!-- ops -->
    <button class="tool-button" :disabled="!canUndo" @click="emit('undo')">
      <Icon name="material-symbols:undo" />
    </button>
    <button class="tool-button" :disabled="!canRedo" @click="emit('redo')">
      <Icon name="material-symbols:redo" />
    </button>
    <button class="tool-button" @click="emit('clear')">
      <Icon name="material-symbols:delete-outline-rounded" />
    </button>
    <!-- separator -->
    <div class="separator" />
    <!-- close -->
    <button
      class="tool-button"
      @click="emit('close')"
    >
      <Icon name="mdi:close-circle-outline" />
    </button>
  </div>
</template>

<style scoped>
.separator {
  @apply m-x-2 m-y-1 bg-neutral-700 h-6 w-1px;
}

.tool-button {
  @apply rounded-full m-0 bg-transparent border-none h-8 w-8 p-0 flex place-items-center place-content-center;
}

.tool-button:hover {
  @apply bg-neutral-600;
}

.tool-button.active {
  @apply bg-white text-black;
}

.tool-button:disabled {
  @apply text-neutral-600 bg-transparent border-none;
}

.color-button {
  @apply m-0 bg-transparent text-dark-50 rounded-full border-none h-8 w-8 p-0 flex place-items-center place-content-center;
}

.color-button:hover,
.color-button.active {
  @apply bg-neutral-600;
}
</style>
