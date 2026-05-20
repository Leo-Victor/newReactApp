interface HeroProps {
    name: string;
    role: string;
    description: string;
}

const heroData: HeroProps = {
    name: 'Nguyên Văn A',
    role: 'Front-end Developer',
    description: 'Mình là lập trình viên Frontend đam mê xây dựng giao diện đẹp và trải nghiệm người dùng tốt. Đang học React + TypeScript.',
};

function HeroSection() {
    const { name, role, description } = heroData;
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-avatar">{name.charAt(0)}</div>
                <p className="hero-role">Xin chào, mình là</p>
                <h1 className="hero-name">{name}</h1>
                <h2 className="hero-title">{role}</h2>
                <p className="hero-desc">{description}</p>
                <div className="hero-buttons">

                    <button
                        className="btn-primary"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Xem dự án
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Liên hệ
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;

//