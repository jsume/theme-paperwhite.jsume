<script setup lang="ts">
import type { ProjectsType } from '@jsume/schemas'

const props = defineProps<{
  item: ProjectsType[number]
}>()

const { user, repo } = extractUserAndRepoFromARepoUrl(props.item.githubUrl)

const { data: reqData } = await useFetch<{ stargazers_count: number }>(`https://api.github.com/repos/${user}/${repo}`, {
  pick: ['stargazers_count'],
})
</script>

<template>
  <div>
    <!-- header -->
    <div class="flex items-center justify-between">
      <div class="section-item-header-info">
        <div class="icon-text">
          <!-- project name -->
          <span class="font-bold">{{ item.name }}</span>
          <!-- project website -->
          <a v-if="item.website" :href="item.website" class="flex items-center">
            <Icon name="mdi:web" />
          </a>
          <!-- project github repo -->
          <a v-if="item.githubUrl" :href="item.githubUrl" class="flex items-center">
            <Icon name="mdi:github" />
          </a>
        </div>
      </div>
      <!-- stars -->
      <a
        v-if="item.githubUrl && reqData?.stargazers_count"
        :href="item.githubUrl"
        class="group icon-text"
      >
        <Icon name="mdi:star" class="transition duration-400 ease-in-out group-hover:text-yellow-300" />
        <span>{{ reqData.stargazers_count }}</span>
      </a>
    </div>
    <!-- info -->
    <div class="section-item-header-info text-sm text-neutral-400">
      <Duration
        v-if="item.startDate && item.endDate !== undefined"
        :start-date="item.startDate"
        :end-date="item.endDate"
      />
      <OnGoing v-if="!item.endDate" />
    </div>
    <!-- summary -->
    <div v-if="item.summary" class="mt-1">
      {{ item.summary }}
    </div>
    <!-- highlights -->
    <Collapse v-if="item.highlights?.length">
      <ul class="text-neutral-600 font-light mt-1 pl-8 list-circle">
        <li v-for="highlight in item.highlights" :key="highlight">
          {{ highlight }}
        </li>
      </ul>
    </Collapse>
  </div>
</template>
