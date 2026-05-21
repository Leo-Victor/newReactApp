import { skills, type Skill } from '../data/profileData';
import { useMemo } from 'react';

function SkillsSection() {
    //useMemo - tính toán nhóm skills, chỉ tính lại khi skill thay đổi
    const grouped = useMemo(() => {
        return {
            frontend: skills.filter((s: Skill) => s.category === 'frontend'),
            language: skills.filter((s: Skill) => s.category === 'language'),
            tool: skills.filter((s: Skill) => s.category === 'tool'),
        };
    }, []);

    const categoryLabel: Record<string, string> = {
        frontend:'Frontend',
        language: 'ngôn ngữ',
        tool: 'công cụ',
    };

    return(
        <section className='skills' id="skills">
            <div className='section-container'>
                <h2 className='section-title'>kỹ năng</h2>
                <p className='section-subtitle'>Những công nghệ mình đang học và làm việc</p>
                <div className='skill-grid'>
                    {Object.entries(grouped).map(([category, items])=>(
                        <div key={category} className='skill-group'>
                            <h3 className='skill-group-title'>{categoryLabel[category]}</h3>
                            {items.map((skill: Skill)=>(
                                <div key={skill.name} className='skill-item'>
                                    <div className='skill-header'>
                                        <span className='skill-name'>{skill.name}</span>
                                        <span className='skill-percent'>{skill.level}%</span>
                                    </div>
                                    <div className='skill-bar'>
                                        <div className='skill-fill' style={{width:`${skill.level}%`}}></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default SkillsSection;