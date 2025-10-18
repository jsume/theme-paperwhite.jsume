<script setup lang="ts">
import type { BasicsType } from '@jsume/schemas'

const props = defineProps<{
  profile: Required<BasicsType>['profiles'][number]
}>()

const map: Record<string, string> = {
  'behance': 'mdi:behance',
  'bitbucket': 'mdi:bitbucket',
  'codepen': 'mdi:codepen',
  'dev-to': 'mdi:dev-to',
  'discord': 'mdi:discord',
  'dribbble': 'mdi:dribbble',
  'email': 'mdi:email',
  'facebook': 'mdi:facebook',
  'facebook-messenger': 'mdi:facebook-messenger',
  'github': 'mdi:github',
  'gitlab': 'mdi:gitlab',
  'instagram': 'mdi:instagram',
  'linkedin': 'mdi:linkedin',
  'map-marker': 'mdi:map-marker',
  'medium': 'mdi:medium',
  'phone': 'mdi:phone',
  'pinterest': 'mdi:pinterest',
  'reddit': 'mdi:reddit',
  'skype': 'mdi:skype',
  'slack': 'mdi:slack',
  'snapchat': 'mdi:snapchat',
  'soundcloud': 'mdi:soundcloud',
  'spotify': 'mdi:spotify',
  'stack-overflow': 'mdi:stack-overflow',
  'telegram': 'mdi:telegram',
  'twitch': 'mdi:twitch',
  'twitter': 'mdi:twitter',
  'vimeo': 'mdi:vimeo',
  'web': 'mdi:web',
  'wechat': 'mdi:wechat',
  'whatsapp': 'mdi:whatsapp',
  'youtube': 'mdi:youtube',
}

const iconName = computed(() => {
  // use regext to match the icon
  return map[Object.keys(map).find(key => new RegExp(key, 'i').test(props.profile.network)) || ''] || 'mdi:link'
})
</script>

<template>
  <a :href="profile.url" :aria-label="profile.network">
    <Icon :name="iconName" />
  </a>
</template>
