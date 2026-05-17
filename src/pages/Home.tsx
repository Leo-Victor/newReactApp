import '../components/Home.css'; // ← thêm dòng này
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

function Home() {
    return (
        <main>
            <HeroSection />
            <FeaturesSection />
            <ProjectsSection />
            <Footer />
        </main>
    );
}

export default Home;