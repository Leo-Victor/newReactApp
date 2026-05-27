import { useEffect, useState } from 'react';

export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

function useFetchProjects() {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Leo-Victor';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=6&sort=updated`
        );

        if (response.status === 404) {
          throw new Error('Không tìm thấy user GitHub.');
        }

        if (response.status === 403) {
          throw new Error('GitHub API đang bị giới hạn lượt gọi. Thử lại sau.');
        }

        if (!response.ok) {
          throw new Error('Lỗi khi tải dữ liệu dự án.');
        }

        const data: Project[] = await response.json();

        if (data.length === 0) {
          throw new Error('Chưa có dự án nào.');
        }

        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Lỗi không xác định.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  return { projects, loading, error };
}

export default useFetchProjects;
