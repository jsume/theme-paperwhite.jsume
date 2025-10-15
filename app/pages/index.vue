<script setup lang="ts">
const sections = [
  'about',
  'projects',
  'work',
  'education',
  'publications',
  'certificates',
  'awards',
  'skills',
  'languages',
] as const
</script>

<template>
  <div class="mx-auto p-4 container grid grid-cols-[16fr_50fr] lg:px-16 xl:px-44 lt-sm:block">
    <DrawingLayer />
    <Basics />
    <div class="py-8 max-w-screen-lg md:px-8 sm:px-6 lt-sm:pt-0">
      <SectionIs v-for="section in sections" :key="section" :name="section" />
    </div>
    <Menu />
    <BackToTop />
  </div>
</template>

<style>

</style>
