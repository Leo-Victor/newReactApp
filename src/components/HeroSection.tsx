import { useNavigate } from 'react-router-dom'; // ← dòng 1
import { profile } from '../data/profileData'

function HeroSection() {
  const navigate = useNavigate();


  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">{profile.avatar}</div>
        <p className="hero-role">👋 Xin chào, mình là</p>
        <h1 className="hero-name">{profile.name}</h1>
        <h2 className="hero-title">{profile.role}</h2>
        <p className="hero-desc">{profile.tagline}</p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Xem dự án
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/calculator')}
          >
            Tính toán
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
