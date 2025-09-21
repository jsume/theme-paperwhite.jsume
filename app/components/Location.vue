<script setup lang="ts">
import type { LocationType } from '@jsume/schemas'

const props = defineProps<{
  location?: LocationType
}>()

const loc = computed(() => locationToString(props.location))
</script>

<template>
  <span v-if="loc" class="icon-text">
    <Icon name="material-symbols:location-on" />
    <span class="whitespace-nowrap">{{ loc }}</span>
  </span>
</template>
