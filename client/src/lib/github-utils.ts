import type { GitHubStats } from './github-api';

/**
 * Calculate total stars across main Parse Platform repositories
 * @param githubStats - GitHub statistics data
 * @param fallback - Fallback value when stats are not available (default: 15000)
 * @returns Total number of stars across repositories
 */
export function calculateTotalStars(githubStats: GitHubStats | undefined, fallback: number = 15000): number {
  if (!githubStats) {
    return fallback;
  }
  
  return (
    githubStats.parseServer.stars +
    githubStats.parseDashboard.stars +
    githubStats.parseJsSDK.stars +
    githubStats.parseIOSSDK.stars +
    githubStats.parseAndroidSDK.stars
  );
}

/**
 * Calculate total forks across main Parse Platform repositories
 * @param githubStats - GitHub statistics data
 * @param fallback - Fallback value when stats are not available (default: 8000)
 * @returns Total number of forks across repositories
 */
export function calculateTotalForks(githubStats: GitHubStats | undefined, fallback: number = 8000): number {
  if (!githubStats) {
    return fallback;
  }
  
  return (
    githubStats.parseServer.forks +
    githubStats.parseDashboard.forks +
    githubStats.parseJsSDK.forks +
    githubStats.parseIOSSDK.forks +
    githubStats.parseAndroidSDK.forks
  );
}

/**
 * Estimate active developers based on available metrics
 * @param githubStats - GitHub statistics data  
 * @param fallback - Fallback value when stats are not available (default: 50000)
 * @returns Estimated number of active developers
 */
export function estimateActiveDevelopers(githubStats: GitHubStats | undefined, fallback: number = 50000): number {
  if (!githubStats) {
    return fallback;
  }
  
  // Use fork count as primary indicator
  // Research shows ~5-10 developers per fork in active projects
  const totalForks = calculateTotalForks(githubStats);
  const forkBasedEstimate = totalForks * 7;
  
  // Use stars as secondary indicator  
  // ~3-5% of stars represent active developers
  const totalStars = calculateTotalStars(githubStats);
  const starBasedEstimate = totalStars * 0.04;
  
  // Weighted combination
  const estimate = Math.round((forkBasedEstimate * 0.7) + (starBasedEstimate * 0.3));
  
  // Apply realistic bounds
  return Math.min(Math.max(estimate, 15000), 150000);
}
