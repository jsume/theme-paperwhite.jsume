<script setup lang="ts">
const { skills } = storeToRefs(useMainStore())
</script>

<template>
  <div class="gap-3 grid grid-cols-[auto_1fr]">
    <template v-for="skill in skills" :key="skill.name">
      <h4 class="font-bold text-right">
        {{ skill.name }}
      </h4>
      <span class="text-neutral-600 text-left">
        {{ skill.keywords.join(', ') }}
      </span>
    </template>
  </div>
</template>
