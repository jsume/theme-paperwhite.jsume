<script setup lang="ts">
const bus = useEventBus('keyboard-shortcuts')

function onKeyStroke<T>(type: KeyStrokeEventType, cb: (data: T) => void) {
  bus.on((t, data) => {
    if (t === type) {
      cb(data)
    }
  })
}

provide('onKeyStroke', onKeyStroke)
provide('emitKeyStroke', bus.emit)

onMounted(() => {
  const activeElement = useActiveElement()
  const isInputting = computed(() => ['INPUT', 'TEXTAREA'].includes(activeElement.value?.tagName || ''))

  window.addEventListener('keydown', (e) => {
    if (isInputting.value)
      return

    let handled = true
    const noModifier = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey

    if (e.code === 'Escape') {
      bus.emit(KeyStrokeEventType['DRAW:STOP'])
    }
    else if (e.code === 'KeyD' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:TOGGLE'])
    }
    else if (e.code === 'KeyC' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:CLEAR'])
    }
    else if (e.code === 'KeyL' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_MODE'], 'line')
    }
    else if (e.code === 'KeyA' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_MODE'], 'arrow')
    }
    else if (e.code === 'KeyS' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_MODE'], 'stylus')
    }
    else if (e.code === 'KeyR' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_MODE'], 'rectangle')
    }
    else if (e.code === 'KeyE' && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_MODE'], 'ellipse')
    }
    else if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
      if (e.shiftKey)
        bus.emit(KeyStrokeEventType['DRAW:REDO'])
      else
        bus.emit(KeyStrokeEventType['DRAW:UNDO'])
    }
    else if (e.code.startsWith('Digit') && noModifier) {
      bus.emit(KeyStrokeEventType['DRAW:SET_COLOR'], Number(e.code[5]) - 1)
    }
    else if (e.code === 'KeyF' && noModifier) {
      bus.emit(KeyStrokeEventType['FULLSCREEN:TOGGLE'])
    }
    else if (e.code === 'KeyU' && noModifier) {
      bus.emit(KeyStrokeEventType.ZOOM, 0)
    }
    else if (e.code === 'KeyI' && noModifier) {
      bus.emit(KeyStrokeEventType.ZOOM, 1)
    }
    else if (e.code === 'KeyO' && noModifier) {
      bus.emit(KeyStrokeEventType.ZOOM, -1)
    }
    else {
      handled = false
    }

    if (handled) {
      e.preventDefault()
      e.stopPropagation()
    }
  })
})
</script>

<template>
  <slot />
</template>
