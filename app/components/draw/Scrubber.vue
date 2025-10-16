<script setup lang="ts">
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  secondary: { type: Number, default: 0 },
  modelValue: { type: Number, required: true },
})

const emit = defineEmits(['update:modelValue'])

const scrubber = shallowRef<HTMLDivElement>()
const scrubbing = shallowRef(false)
const pendingValue = shallowRef(0)

useEventListener('mouseup', () => scrubbing.value = false, { passive: true })

const value = useVModel(props, 'modelValue', emit)
const { elementX, elementWidth } = useMouseInElement(scrubber)

watch([scrubbing, elementX], () => {
  const progress = Math.max(0, Math.min(1, (elementX.value) / elementWidth.value))
  pendingValue.value = progress * props.max
  if (scrubbing.value)
    value.value = pendingValue.value
})
</script>

<template>
  <div ref="scrubber" class="rounded-1.5 bg-white bg-opacity-20 h-3 cursor-pointer select-none relative dark:bg-white dark:bg-opacity-10" @mousedown="scrubbing = true">
    <div class="rounded-1.5 h-full w-full relative overflow-hidden">
      <div class="rounded-1.5 bg-white opacity-30 h-full w-full left-0 top-0 absolute" :style="{ transform: `translateX(${secondary / max * 100 - 100}%)` }" />
      <div class="rounded-1.5 bg-white h-full w-full relative" :style="{ transform: `translateX(${value / max * 100 - 100}%)` }" />
    </div>
    <div class="opacity-0 inset-0 absolute hover:opacity-100" :class="{ '!opacity-100': scrubbing }">
      <slot :pending-value="pendingValue" :position="`${Math.max(0, Math.min(elementX, elementWidth))}px`" />
    </div>
  </div>
</template>
