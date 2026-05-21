import { expreriences } from "../data/profileData";

function ExprienceSection(){
    return(
        <section className="experience" id="experience">
            <div className="section-container">
                <h2 className="section-title">Kinh nghiệm</h2>
                <p className="section-subtitle">Quá trình học tập và làm việc</p>
                <div className="timeline">
                    {expreriences.map((exp) => (
                        <div key={exp.id} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h3 className="timeline-title">{exp.title}</h3>
                                    <span className="timeline-time">{exp.time}</span>
                                </div>
                                <p className="timeline-company">{exp.company}</p>
                                <p className="timeline-desc">{exp.description}</p>
                                <div className="timeline-tags">
                                    {exp.tags.map((tag) => 
                                        <span key={tag} className="timeline-tag">
                                            {tag}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ExprienceSection;