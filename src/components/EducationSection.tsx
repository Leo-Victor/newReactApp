import { educations } from '../data/profileData';

function EducationSection() {
    return (
        <section className="education" id="education">
            <div className="section-container">
                <h2 className="section-title">Học vấn</h2>
                <p className="section-subtitle">Quá trình học tập</p>
                <div className="edu-grid">
                    {educations.map((edu) => (
                        <div key={edu.id} className="edu-card">
                            <div className="edu-header">
                                <div>
                                    <h3 className="edu-school">{edu.school}</h3>
                                    <p className="edu-major">{edu.major}</p>
                                </div>
                                <div className="edu-right">
                                    <span className="edu-time">{edu.time}</span>
                                    {edu.gpa && (
                                        <span className="edu-gpa">GPA: {edu.gpa}</span>
                                    )}
                                </div>
                            </div>
                            <p className="edu-desc">{edu.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default EducationSection;