import useFetchProjects from '../hooks/useFetchProjects';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

function ProjectsSection() {
  //const username = 'Leo-Victor';
  const { projects, loading, error } = useFetchProjects();

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <h2 className="section-title">Dự án nổi bật</h2>
        <p className="section-subtitle">Dữ liệu được lấy từ GitHub API</p>

        {loading && <LoadingState message="Đang tải dự án..." />}
        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <div className="project-header">
                  <span className="project-name">{project.name}</span>
                  <span className="project-stars">
                    ⭐ {project.stargazers_count}
                  </span>
                </div>
                <p className="project-desc">
                  {project.description || 'Không có mô tả'}
                </p>
                {project.language && (
                  <span className="project-lang">{project.language}</span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
