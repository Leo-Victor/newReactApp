interface Skill {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const skills: Skill[] = [
    {
        id: 1,
        icon: '⚛️',
        title: 'React JS',
        description: 'Xây dựng giao diện với Functional Component, Hooks và React Router. ',
    },
    {
        id: 2,
        icon: '🔷',
        title: 'TypeScript',
        description: 'Viết code toàn hơn với Static Typing, Interface và Generic Types.'
    },
    {
        id: 3,
        icon: '🎨',
        title: 'Css / Reponsive',
        description: 'Thiết kế giao diện đẹp, reponsive trên mội thiết bị với Flexbox và Grid.',
    },
    {
        id: 4,
        icon: '🌐',
        title: 'REST API',
        description: 'Giao tiếp với Backend qua fectch API, Xủ lý loading và error state.'
    },
];

function FeaturesSection() {
    return (
        <section className="features" id="features">
            <div className="section-container">
                <h2 className="section-title">Kỹ năng của mình</h2>
                <p className="section-subtitle">Những công nghệ mình đang học và làm việc</p>
                <div className="features-grid">
                    {skills.map((skill: Skill) => (
                        <div key={skill.id} className="feature-card">
                            <div className="feature-icon">{skill.icon}</div>
                            <h3 className="feature-title">{skill.title}</h3>
                            <p className="feature-desc">{skill.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;