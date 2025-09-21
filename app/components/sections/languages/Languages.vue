<script setup lang="ts">
const { languages } = storeToRefs(useMainStore())
</script>

<template>
  <div class="lt-lg:(flex flex-col gap-3)">
    <template v-for="language, index in languages" :key="language.language">
      <span>
        <span class="font-bold">
          {{ language.language }}
        </span> ({{ language.fluency }}){{ index < languages!.length - 1 ? ', ' : '' }}
      </span>
    </template>
  </div>
</template>
