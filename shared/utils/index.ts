import type {
  BasicsType,
  DateType,
  EndDateType,
} from '@jsume/schemas'
import process from 'node:process'
import { githubUrlSchema } from '@jsume/schemas'

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateGistUrl(
  username?: string,
  gistId?: string,
  filename?: string,
) {
  if (!username || !gistId || !filename)
    return ''
  return `https://gist.githubusercontent.com/${username}/${gistId}/raw/${filename}`
}

export function getGistUrl(filename: string) {
  return generateGistUrl(process.env.NUXT_PUBLIC_GIST_USERNAME, process.env.NUXT_PUBLIC_GIST_ID, filename)
}

export function locationToString(location: BasicsType['location']) {
  if (!location)
    return undefined
  if (typeof location === 'string')
    return location
  return `${location.city}, ${location.country}`
}

export function datesToDuration(startDate: DateType, endDate?: EndDateType) {
  let startStr: string | undefined
  let endStr: string | undefined

  if (typeof startDate === 'string') {
    startStr = startDate
  }
  else {
    const { year, month, day } = startDate
    startStr = day ? `${year}-${month}-${day}` : month ? `${year}-${month}` : `${year}`
  }

  if (endDate === undefined) {
    return startStr
  }

  if (endDate === false) { /* empty */ }
  else if (typeof endDate === 'string') {
    endStr = endDate
  }
  else {
    const { year, month, day } = endDate
    endStr = day ? `${year}-${month}-${day}` : month ? `${year}-${month}` : `${year}`
  }

  return `${startStr} → ${endStr}`
}

export function extractUserAndRepoFromARepoUrl(url?: string) {
  let user: string | undefined
  let repo: string | undefined

  if (url) {
    const result = githubUrlSchema.safeParse(url)
    if (result.success) {
      const repoUrl = new URL(url)
      // get user and repo from url
      user = repoUrl.pathname.split('/')[1] || undefined
      repo = repoUrl.pathname.split('/')[2] || undefined
    }
  }
  return { user, repo }
}
