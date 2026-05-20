import { useState, useEffect } from 'react';

interface Project {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
}

function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    // ✅ Đổi thành repo của Leo-Victor
                    // Đổi facebook thành Leo-Victor
                    'https://api.github.com/users/Leo-Victor/repos?per_page=6&sort=updated'
                );
                if (!response.ok) throw new Error('Không thể tải dữ liệu');
                const data: Project[] = await response.json();
                setProjects(data);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="projects" id="projects">
            <div className="section-container">
                <h2 className="section-title">Dự án nổi bật</h2>
                <p className="section-subtitle">Dữ liệu được lấy từ GitHub API</p>

                {loading && (
                    <div className="state-box">
                        <div className="spinner"></div>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                )}

                {error && (
                    <div className="state-box error">
                        <p>⚠️ {error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="projects-grid">
                        {projects.map((project: Project) => (
                            <a
                                key={project.id}
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card"
                            >
                                <div className="project-header">
                                    <span className="project-name">{project.name}</span>
                                    <span className="project-stars">⭐ {project.stargazers_count}</span>
                                </div>
                                <p className="project-desc">
                                    {project.description || 'Không có mô tả'}
                                </p>
                                {
                                    project.language && (
                                        <span className="project-lang">{project.language}</span>
                                    )
                                }
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section >
    );
}

export default ProjectsSection;