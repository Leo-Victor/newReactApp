import { aboutMe, profile } from '../data/profileData';

function AboutSection() {
    return (
        <section className="about" id="about">
            <div className='section-container'>
                <h2 className='section-title'>về mình</h2>
                <p className='section-subtitle'>Một chút về bản thân</p>
                <div className='about-grid'>
                    <div className='about-text'>
                        <p className='about-desc'>{aboutMe.description}</p>
                        <ul className='about-highlights'>
                            {aboutMe.highlights.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='about-card'>
                        <div className='about-avatar'>{profile.avatar}</div>
                        <p className='about-name'>{profile.name}</p>
                        <p className='about-role'>{profile.role}</p>
                        <p className='about-location'>📍 {profile.location} </p>
                        <div className='about-links'>
                            <a href={profile.githup} target='_blank' rel="noopener noreferre">
                                Githup
                            </a>
                            <a href={profile.linkedin} target='_blank' rel="noopener noreferre">
                                LinkedIn
                            </a>
                            <a href={`mailto: ${profile.email}`}>Email</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;

//