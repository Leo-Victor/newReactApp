import { useMemo, useState } from 'react';
import ProjectLanguageFilter from './ProjectLanguageFilter';
import { customProjects } from '../data/projectsData';
import {
  ALL_PROJECTS_FILTER,
  type ProjectLanguageFilter as ProjectLanguageFilterValue,
} from '../data/portfolio.config';

function ProjectsSection() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectLanguageFilterValue>(ALL_PROJECTS_FILTER);

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_PROJECTS_FILTER) return customProjects;

    return customProjects.filter((project) =>
      project.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <h2 className="section-title">Dự án nổi bật</h2>
        <p className="section-subtitle">
          Các dự án tự chọn, được mô tả và sắp xếp thủ công.
        </p>

        <ProjectLanguageFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <img
                  className="project-thumbnail"
                  src={project.thumbnail}
                  alt={`Ảnh đại diện dự án ${project.name}`}
                  loading="lazy"
                />

                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags" aria-label="Công nghệ sử dụng">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-lang">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-primary"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="state-box">Chưa có dự án nào dùng {activeFilter}.</div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
