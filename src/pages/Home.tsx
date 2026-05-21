import '../components/Home.css'; // ← thêm dòng này
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
//import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import FeaturesSection from '../components/FeaturesSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      {/* <SkillsSection /> */}
      <FeaturesSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <Footer />
    </main>
  );
}

export default Home;
