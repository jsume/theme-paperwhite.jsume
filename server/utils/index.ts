import process from 'node:process'
import { generateGistUrl } from '../../shared/utils/'

export function getGistUrl(filename: string) {
  return generateGistUrl(process.env.NUXT_PUBLIC_GIST_USERNAME, process.env.NUXT_PUBLIC_GIST_ID, filename)
}
