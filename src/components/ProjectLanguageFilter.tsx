import {
  PROJECT_LANGUAGE_FILTERS,
  type ProjectLanguageFilter as ProjectLanguageFilterValue,
} from '../data/portfolio.config';

interface ProjectLanguageFilterProps {
  activeFilter: ProjectLanguageFilterValue;
  onFilterChange: (filter: ProjectLanguageFilterValue) => void;
}

function ProjectLanguageFilter({
  activeFilter,
  onFilterChange,
}: ProjectLanguageFilterProps) {
  return (
    <div className="project-filter" aria-label="Lọc dự án theo công nghệ">
      {PROJECT_LANGUAGE_FILTERS.map((language) => {
        const isActive = activeFilter === language;

        return (
          <button
            key={language}
            type="button"
            className={`project-filter-chip ${isActive ? 'active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onFilterChange(language)}
          >
            {language}
          </button>
        );
      })}
    </div>
  );
}

export default ProjectLanguageFilter;
