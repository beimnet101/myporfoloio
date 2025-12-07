import React, { useEffect, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';

import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaServer,
  
} from 'react-icons/fa';

import {
  SiFirebase ,
  SiRubyonrails,
  SiTypescript,
  SiPostgresql,
  SiMysql,
  SiKubernetes,
  SiGooglecloud,
  SiSpringboot,
  SiPhp,
  SiNetlify,
  SiHeroku,
  SiHtml5,
  SiCss3,
  SiRabbitmq,
  SiImessage,
  SiGo,
  SiDart,
  SiCsharp,
  SiPython,
  SiExpo,
  SiDotnet,
  SiStripe,
  SiCockroachlabs,
  SiMongodb,
  SiVercel,
  
} from 'react-icons/si';

import { Skill } from '../types';

const iconMap: { [key: string]: JSX.Element } = {
  // Languages
  FaJava: <FaJava />,
  SiTypescript: <SiTypescript />,
  SiGo: <SiGo />,
  SiDart: <SiDart />,
  SiCsharp: <SiCsharp />,
  SiPython: <SiPython />,
  SiFirebase :<SiFirebase/>,
  // Frameworks / Tools
  SiSpringboot: <SiSpringboot />,
  FaNodeJs: <FaNodeJs />,
  FaReact: <FaReact />,
  SiExpo: <SiExpo />,
  SiDotnet: <SiDotnet />,
  FaServer: <FaServer />,
  SiStripe: <SiStripe />,
SiVercel:<SiVercel/>,
  // Existing icons
  FaAws: <FaAws />,
  FaDocker: <FaDocker />,
  FaGitAlt: <FaGitAlt />,
  SiRubyonrails: <SiRubyonrails />,
  SiPhp: <SiPhp />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiKubernetes: <SiKubernetes />,
  SiGooglecloud: <SiGooglecloud />,
  SiHeroku: <SiHeroku />,
  SiNetlify: <SiNetlify />,
  SiHtml5: <SiHtml5 />,
  SiCss3: <SiCss3 />,
  SiRabbitmq: <SiRabbitmq />,
  SiImessage: <SiImessage />,
  SiCockroachlabs: <SiCockroachlabs />,
  SiMongodb: <SiMongodb />,
};

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkillsData(data);
    }

    fetchSkills();
  }, []);

  if (skillsData.length === 0) return <div>Loading...</div>;

  const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="skills-container">
      {Object.keys(skillsByCategory).reverse().map((category, index) => (
        <div key={index} className="skill-category">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {skillsByCategory[category].map((skill: any, idx: number) => (
              <div key={idx} className="skill-card">
                <div className="icon">{iconMap[skill.icon] || <FaReact />}</div>
                <h3 className="skill-name">
                  {skill.name.split('').map((letter: any, i: number) => (
                    <span
                      key={i}
                      className="letter"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
