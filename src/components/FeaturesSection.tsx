import { useMemo } from 'react';
import { skills } from '../data/profileData';


function FeaturesSection() {
  // useMemo — chỉ tính lại khi skills thay đổi
  const featuredSkills = useMemo(() => {
    return skills.slice(0, 8);
  }, []);

  const iconMap: Record<string, string> = {
    'HTML/CSS': '🎨',
    'JavaScript': '⚡',
    'TypeScript': '🔷',
    'React JS': '⚛️',
    'Git/GitHub': '🐙',
    'Vite': '🚀',
    'Java': '☕',
    //    'Figma': '🎭',
  };

  const descMap: Record<string, string> = {
    'HTML/CSS': 'Xây dựng giao diện web chuẩn, responsive với Flexbox và Grid.',
    'JavaScript': 'Lập trình ES6+, async/await, DOM manipulation.',
    'TypeScript': 'Viết code an toàn hơn với Static Typing và Interface.',
    'React JS': 'Xây dựng UI với Functional Component, Hooks, React Router.',
    'Git/GitHub': 'Quản lý source code, làm việc nhóm với Git workflow.',
    'Vite': 'Build tool hiện đại, khởi tạo và build project nhanh.',
    'Java': 'Lập trình OOP, xây dựng ứng dụng console và web backend.',
    //  'Figma': 'Thiết kế UI/UX, prototype và handoff cho developer.',
  };

  return (
    <section className="features" id="skills">
      <div className="section-container">
        <h2 className="section-title">Kỹ năng của mình</h2>
        <p className="section-subtitle">Những công nghệ mình đang học và làm việc</p>
        <div className="features-grid">
          {featuredSkills.map((skill) => (
            <div key={skill.name} className="feature-card">
              <div className="feature-icon">
                {iconMap[skill.name] || '💻'}
              </div>
              <h3 className="feature-title">{skill.name}</h3>
              <p className="feature-desc">
                {descMap[skill.name] || 'Đang học và phát triển kỹ năng này.'}
              </p>
              <div className="feature-level">
                <div className="feature-bar">
                  <div
                    className="feature-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="feature-percent">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export default FeaturesSection;
