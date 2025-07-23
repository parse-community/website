export interface GitHubRepo {
  repository: string;
  stars: number;
  forks: number;
}

export interface GitHubStats {
  parseServer: GitHubRepo;
  parseDashboard: GitHubRepo;
  parseJsSDK: GitHubRepo;
  parseIOSSDK: GitHubRepo;
  parseAndroidSDK: GitHubRepo;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  // Try to fetch from our API first (cached data)
  try {
    const response = await fetch("/api/github/stats");
    if (response.ok) {
      const stats = await response.json();
      if (stats.length > 0) {
        return formatStatsArray(stats);
      }
    }
  } catch (error) {
    console.warn("Failed to fetch cached GitHub stats, fetching from GitHub API");
  }

  // Fallback to fetching directly from GitHub API
  const repos = [
    { key: "parseServer", owner: "parse-community", repo: "parse-server" },
    { key: "parseDashboard", owner: "parse-community", repo: "parse-dashboard" },
    { key: "parseJsSDK", owner: "parse-community", repo: "Parse-SDK-JS" },
    { key: "parseIOSSDK", owner: "parse-community", repo: "Parse-SDK-iOS-OSX" },
    { key: "parseAndroidSDK", owner: "parse-community", repo: "Parse-SDK-Android" },
  ];

  const results = await Promise.allSettled(
    repos.map(async ({ key, owner, repo }) => {
      try {
        const response = await fetch(`/api/github/fetch/${owner}/${repo}`);
        if (!response.ok) throw new Error(`Failed to fetch ${repo}`);
        const data = await response.json();
        return { key, data };
      } catch (error) {
        // Return default values if API fails
        return {
          key,
          data: getDefaultStats(key),
        };
      }
    })
  );

  const stats: Partial<GitHubStats> = {};
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const { key, data } = result.value;
      stats[key as keyof GitHubStats] = data;
    } else {
      // Fallback to default stats
      const repo = repos[index];
      stats[repo.key as keyof GitHubStats] = getDefaultStats(repo.key);
    }
  });

  return stats as GitHubStats;
}

function formatStatsArray(statsArray: any[]): GitHubStats {
  const statsMap = new Map(statsArray.map(stat => [stat.repository, stat]));
  
  return {
    parseServer: statsMap.get("parse-community/parse-server") || getDefaultStats("parseServer"),
    parseDashboard: statsMap.get("parse-community/parse-dashboard") || getDefaultStats("parseDashboard"),
    parseJsSDK: statsMap.get("parse-community/Parse-SDK-JS") || getDefaultStats("parseJsSDK"),
    parseIOSSDK: statsMap.get("parse-community/Parse-SDK-iOS-OSX") || getDefaultStats("parseIOSSDK"),
    parseAndroidSDK: statsMap.get("parse-community/Parse-SDK-Android") || getDefaultStats("parseAndroidSDK"),
  };
}

function getDefaultStats(key: string): GitHubRepo {
  const defaults: Record<string, GitHubRepo> = {
    parseServer: { repository: "parse-community/parse-server", stars: 20806, forks: 4764 },
    parseDashboard: { repository: "parse-community/parse-dashboard", stars: 3738, forks: 1384 },
    parseJsSDK: { repository: "parse-community/Parse-SDK-JS", stars: 1317, forks: 597 },
    parseIOSSDK: { repository: "parse-community/Parse-SDK-iOS-OSX", stars: 2809, forks: 864 },
    parseAndroidSDK: { repository: "parse-community/Parse-SDK-Android", stars: 1879, forks: 734 },
  };
  
  return defaults[key] || { repository: "", stars: 0, forks: 0 };
}
