<script setup lang="ts">
const { basics } = storeToRefs(useMainStore())
const showImage = ref(false)

const title = computed(() => (
  (basics.value?.name.toUpperCase() || '')
  + (basics.value?.label ? ` | ${basics.value.label}` : '')
))

onMounted(() => {
  useTitle(title)
})
onUpdated(() => {
  useTitle(title)
})
</script>

<template>
  <aside class="p-8 flex flex-col gap-4 wrap-break-word lt-sm:px-0 sm:max-w-xs lt-sm:items-center">
    <ClientOnly fallback="">
      <img
        v-show="basics?.image && showImage"
        :src="basics?.image"
        alt="avatar"
        class="border-transparent rounded-xl max-w-40 w-1/2 aspect-square"
        object="cover center"
        @load="() => { showImage = true }"
      >
    </ClientOnly>
    <hgroup class="flex flex-col lt-sm:justify-center">
      <!-- name -->
      <h1 class="text-4xl leading-none font-extrabold align-top lt-sm:(text-center justify-center)">
        {{ basics?.name }}
      </h1>
      <!-- label -->
      <h2 v-if="basics?.label" class="text-xl text-neutral-500 leading-tight pt-1 lt-sm:(text-center justify-center)">
        {{ basics?.label }}
      </h2>
    </hgroup>
    <!-- profiles -->
    <div v-if="basics?.profiles?.length" class="flex gap-3">
      <ProfileIcons v-for="p in basics?.profiles" :key="p.network" :profile="p" />
    </div>
    <!-- email, phone, url, location -->
    <div class="text-sm flex flex-col flex-wrap gap-1 lt-sm:(flex-row gap-x-4 justify-center)">
      <!-- email -->
      <a v-if="basics?.email" :href="`mailto:${basics?.email}`" class="icon-text" aria-label="Email">
        <Icon name="material-symbols:mail-rounded" />
        <span class="whitespace-nowrap">{{ basics?.email }}</span>
      </a>
      <!-- phone -->
      <a v-if="basics?.phone" :href="`tel:${basics?.phone}`" class="icon-text" aria-label="Phone number">
        <Icon name="material-symbols:phone-enabled" />
        <span class="whitespace-nowrap">{{ basics?.phone }}</span>
      </a>
      <!-- url -->
      <a v-if="basics?.url" :href="basics?.url" class="icon-text" aria-label="URL to personal website">
        <Icon name="material-symbols:account-circle" />
        <span class="whitespace-nowrap">{{ basics?.url }}</span>
      </a>
      <!-- location -->
      <Location :location="basics?.location" />
    </div>
  </aside>
</template>
