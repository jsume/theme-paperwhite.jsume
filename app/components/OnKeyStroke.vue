<script setup lang="ts">
const { drawingEnabled } = storeToRefs(useMainStore())

interface KeyStrokeConfig {
  condition: (code: string, context: { e: KeyboardEvent, noModifier: boolean }) => boolean
  cb: (emit: (type: KeyStrokeEventType, data?: any) => void) => void
}

const confList: KeyStrokeConfig[] = [
  {
    condition: code => code === 'Escape' && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:STOP']),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyD' && noModifier,
    cb: emit => emit(KeyStrokeEventType['DRAW:TOGGLE']),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyC' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:CLEAR']),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyL' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'line'),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyA' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'arrow'),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyS' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'stylus'),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyR' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'rectangle'),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyE' && noModifier && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'ellipse'),
  },
  {
    condition: (code, { e }) => code === 'KeyE' && e.shiftKey && drawingEnabled.value,
    cb: emit => emit(KeyStrokeEventType['DRAW:SET_MODE'], 'eraseLine'),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyZ'
      && (noModifier === false)
      && (window.navigator.platform.includes('Mac') ? (window.event as KeyboardEvent).metaKey : (window.event as KeyboardEvent).ctrlKey),
    cb: (emit) => {
      const e = window.event as KeyboardEvent
      if (e.shiftKey)
        emit(KeyStrokeEventType['DRAW:REDO'])
      else
        emit(KeyStrokeEventType['DRAW:UNDO'])
    },
  },
  {
    condition: (code, { noModifier }) => code.startsWith('Digit') && noModifier && drawingEnabled.value,
    cb: (emit) => {
      const e = window.event as KeyboardEvent
      emit(KeyStrokeEventType['DRAW:SET_COLOR'], Number(e.code[5]) - 1)
    },
  },
  {
    condition: (code, { noModifier }) => code === 'KeyF' && noModifier,
    cb: emit => emit(KeyStrokeEventType['FULLSCREEN:TOGGLE']),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyU' && noModifier,
    cb: emit => emit(KeyStrokeEventType.ZOOM, 0),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyI' && noModifier,
    cb: emit => emit(KeyStrokeEventType.ZOOM, 1),
  },
  {
    condition: (code, { noModifier }) => code === 'KeyO' && noModifier,
    cb: emit => emit(KeyStrokeEventType.ZOOM, -1),
  },
]

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

    let handled = false
    const noModifier = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey

    confList.forEach(({ condition, cb }) => {
      if (condition(e.code, { e, noModifier })) {
        cb(bus.emit)
        handled = true
      }
    })

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
