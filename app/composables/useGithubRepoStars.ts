export function useGithubRepoStars(githubRepoUrl?: string) {
  const config = useRuntimeConfig()
  const { githubAccessToken } = config.public
  const hasGithubAccessToken = !!githubAccessToken

  const { user, repo } = extractUserAndRepoFromARepoUrl(githubRepoUrl)

  return useFetch<{ stargazers_count: number }>(`${GITHUB_API_BASE_URL}/repos/${user}/${repo}`, {
    headers: {
      'X-GitHub-Api-Version': GITHUB_API_VERSION || '2022-11-28',
      'Authorization': hasGithubAccessToken ? `Bearer ${githubAccessToken}` : '',
    },
    pick: ['stargazers_count'],
  })
}
