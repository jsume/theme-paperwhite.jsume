<script setup lang="ts">
import type { CertificatesType } from '@jsume/schemas'

defineProps<{
  item: CertificatesType[number]
}>()
</script>

<template>
  <div>
    <!-- name -->
    <a
      v-if="item.url"
      :href="item.url"
      class="font-bold underline underline-0.0625rem underline-neutral-400 underline-offset-3 underline-dashed"
    >
      {{ item.name }}
    </a>
    <span v-else class="font-bold">
      {{ item.name }}
    </span>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration :start-date="item.issueDate" :end-date="item.expDate" />
      <span class="icon-text">
        <Icon name="mdi:office-building" />
        <span class="whitespace-nowrap">{{ item.issuer }}</span>
      </span>
    </div>
  </div>
</template>
