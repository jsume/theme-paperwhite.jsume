<script setup lang="ts">
import { toRefs } from '@vueuse/core'
import { useDrauu } from '@vueuse/integrations/useDrauu'

const { drawingEnabled } = storeToRefs(useMainStore())
const toggleDrawing = useToggle(drawingEnabled)

const parentEl = useParentElement()
const { height } = useElementSize(parentEl)

const svg = useTemplateRef<SVGSVGElement>('svg')

const colors = ref(['black', 'white', '#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'])
const { clear, undo, redo, brush, canUndo, canRedo } = useDrauu(svg, {
  brush: {
    color: 'black',
    mode: 'draw',
    size: 3,
    arrowEnd: false,
  },
})
const { mode, color, size, arrowEnd } = toRefs(brush)

// event bus
const onKeyStroke = inject<(type: KeyStrokeEventType, cb: (data: any) => any) => (() => void)>('onKeyStroke')!
const unsubToggle = onKeyStroke(KeyStrokeEventType['DRAW:TOGGLE'], () => {
  toggleDrawing()
})
const unsubStop = onKeyStroke(KeyStrokeEventType['DRAW:STOP'], () => {
  drawingEnabled.value = false
})
const unsubClear = onKeyStroke(KeyStrokeEventType['DRAW:CLEAR'], () => {
  drawingEnabled.value && clear()
})
const unsubUndo = onKeyStroke(KeyStrokeEventType['DRAW:UNDO'], () => {
  drawingEnabled.value && undo()
})
const unsubRedo = onKeyStroke(KeyStrokeEventType['DRAW:REDO'], () => {
  drawingEnabled.value && redo()
})
const unsubSetMode = onKeyStroke(KeyStrokeEventType['DRAW:SET_MODE'], (m) => {
  if (m === 'arrow' && drawingEnabled.value) {
    mode!.value = 'line'
    arrowEnd!.value = true
  }
  else if (m === 'line' && drawingEnabled.value) {
    mode!.value = 'line'
    arrowEnd!.value = false
  }
  else {
    drawingEnabled.value && (mode!.value = m)
  }
})
const unsubSetColor = onKeyStroke(KeyStrokeEventType['DRAW:SET_COLOR'], (i) => {
  if (i >= 0 && i < colors.value.length && drawingEnabled.value)
    color!.value = colors.value[i]!
})
const unsubSetSize = onKeyStroke(KeyStrokeEventType['DRAW:SET_SIZE'], (i) => {
  if (i === 1) {
    size!.value = Math.min(size!.value + 1, 10)
  }
  else if (i === -1) {
    size!.value = Math.max(size!.value - 1, 1)
  }
})

onUnmounted(() => {
  unsubToggle && unsubToggle()
  unsubStop && unsubStop()
  unsubClear && unsubClear()
  unsubUndo && unsubUndo()
  unsubRedo && unsubRedo()
  unsubSetMode && unsubSetMode()
  unsubSetColor && unsubSetColor()
  unsubSetSize && unsubSetSize()
})
</script>

<template>
  <DrawingPanel
    v-show="drawingEnabled"
    v-model:color="color"
    v-model:size="size"
    v-model:mode="mode"
    v-model:arrow-end="arrowEnd"
    :colors="colors"
    :can-undo="canUndo"
    :can-redo="canRedo"
    @close="drawingEnabled = false"
    @clear="clear()"
    @undo="undo()"
    @redo="redo()"
  />
  <svg
    ref="svg"
    class="w-full left-0 top-0 absolute z-10"
    :class="{ 'pointer-events-none': !drawingEnabled, 'touch-none': drawingEnabled }"
    :style="{ height: `${height}px` }"
  />
</template>
