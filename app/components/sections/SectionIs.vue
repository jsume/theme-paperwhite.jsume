<script setup lang="ts">
import About from '@/components/sections/about/About.vue'
import Awards from '@/components/sections/awards/Awards.vue'
import Certificates from '@/components/sections/certificates/Certificates.vue'
import Education from '@/components/sections/education/Education.vue'
import Languages from '@/components/sections/languages/Languages.vue'
import Projects from '@/components/sections/projects/Projects.vue'
import Publications from '@/components/sections/publications/Publications.vue'
import Skills from '@/components/sections/skills/Skills.vue'
import Work from '@/components/sections/work/Work.vue'

interface Props {
  name: 'about' | 'work' | 'projects'
    | 'publications' | 'education' | 'certificates'
    | 'awards' | 'skills' | 'languages'
}

defineProps<Props>()

const { jsumeData } = storeToRefs(useMainStore())

const compList = {
  About,
  Work,
  Projects,
  Publications,
  Education,
  Certificates,
  Awards,
  Skills,
  Languages,
}
</script>

<template>
  <Section v-if="jsumeData?.[name] || jsumeData?.basics && name === 'about'" :title="$t(`jsume.${name}.title`)">
    <component :is="compList[capitalize(name) as keyof typeof compList]" />
  </Section>
</template>
