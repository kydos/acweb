export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
}

export async function fetchRepo(fullName: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      next: { revalidate: 3600 }, // cache for 1 hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Optionally add a GitHub token for higher rate limits:
        // "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) return null;
    const data = await res.json();

    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description ?? "",
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics ?? [],
    };
  } catch {
    return null;
  }
}

export async function fetchRepos(
  repoNames: readonly string[]
): Promise<GitHubRepo[]> {
  const results = await Promise.all(repoNames.map(fetchRepo));
  return results.filter((r): r is GitHubRepo => r !== null);
}
