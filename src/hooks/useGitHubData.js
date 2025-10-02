import { useState, useEffect, useCallback } from "react";
import { gitHubUsername, gitHubLink, gitHubQuerry } from "../editable-stuff/configurations.json";

/**
 * Custom hook to fetch GitHub repository data
 * @param {number} limit - Number of repositories to fetch
 * @returns {object} - { data, loading, error, refetch }
 */
export const useGitHubRepos = (limit = 6) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    if (!gitHubUsername) {
      setError("GitHub username not configured");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${gitHubLink}${gitHubUsername}${gitHubQuerry}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();
      
      // Filter and sort repositories
      const filteredRepos = repos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, limit)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          topics: repo.topics || [],
        }));

      setData(filteredRepos);
    } catch (err) {
      console.error("Error fetching GitHub repos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const refetch = useCallback(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { data, loading, error, refetch };
};

/**
 * Custom hook to fetch GitHub user profile data
 * @returns {object} - { profile, loading, error }
 */
export const useGitHubProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!gitHubUsername) {
        setError("GitHub username not configured");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${gitHubLink}${gitHubUsername}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const userData = await response.json();
        setProfile({
          login: userData.login,
          name: userData.name,
          bio: userData.bio,
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        });
      } catch (err) {
        console.error("Error fetching GitHub profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};