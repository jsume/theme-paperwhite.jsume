<script setup lang="ts">
const { menuOpened } = storeToRefs(useMainStore())
const toggle = useToggle(menuOpened)

const menu = useTemplateRef<HTMLElement>('menu')

onClickOutside(menu, () => {
  menuOpened.value = false
})

// event bus
const onKeyStroke = inject<(type: KeyStrokeEventType, cb: (data: any) => any) => void>('onKeyStroke')!
onKeyStroke(KeyStrokeEventType['MENU:TOGGLE'], () => {
  toggle()
})
</script>

<template>
  <div
    ref="menu"
    class="flex shrink-0 flex-col gap-3 right-10 top-10 fixed z-20 lt-sm:(right-5 top-5)"
  >
    <button
      class="rounded-4 flex shrink-0 flex-col size-8 items-center justify-center"
      :class="{ 'bg-black color-white': menuOpened }"
      @click="toggle()"
    >
      <Icon name="mdi:apps" />
    </button>
    <div
      v-show="menuOpened"
      class="p-1 rounded-4 bg-black flex flex-col gap-3 w-8 items-center justify-center"
    >
      <Fullscreen />
      <Draw />
      <Zoom />
      <LangSelector />
    </div>
  </div>
</template>

<style>
.menu-icon {
  @apply color-white bg-neutral-700 rounded-3 size-6 flex flex-col items-center justify-center text-sm;
}
.menu-icon.active {
  @apply bg-white text-black;
}
</style>
