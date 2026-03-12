import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo } from 'react-icons/si';
import { Project } from '../types';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";
import { hardcodedProjects } from '../data/hardcodedProjects';

const techIcons: { [key: string]: JSX.Element } = {
  "ReactJS": <FaReact />,
  "NodeJS": <FaNodeJs />,
  "AWS": <FaAws />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "Ruby On Rails": <SiRubyonrails />,
  "Material UI": <SiMaterialdesign />,
  "HTML5": <SiHtml5 />,
  "CSS3": <SiCss3 />,
  "jQuery": <SiJquery />,
  "AWS-ECS": <SiAwsamplify />,
  'Cognito': <FaAws />,
  'Lambda': <FaAws />,
  'ECS': <FaAws />,
  'Jenkins': <FaJenkins />,
  'Docker': <FaDocker />,
  'GraphQL': <FaDatabase />,
  'CI/CD': <FaGitlab />,
  'GitLab': <FaGitlab />,
  'GitHub': <FaGithub />,
  'Heroku': <GrDeploy />,
  'Netlify': <GrDeploy />,
  'Firebase': <SiFirebase />,
  'GCP': <FaGoogle />,
  'Azure': <FaMicrosoft />,
  'Kubernetes': <GrKubernetes />,
  'Terraform': <SiTerraform />,
  'ArgoCD': <SiArgo />,
  'Java': <FaJava />,
  'Spring Boot': <FaJava />,
  'Python': <FaPython />,
  'Node.js': <FaNodeJs />,
  'Express.js': <FaNodeJs />,
  'Hibernate': <FaJava />,
  'Maven': <FaJava />,
  'Gradle': <FaJava />,
  'JUnit': <FaJava />,
  'Mockito': <FaJava />,
  'Jest': <FaReact />,
  'React': <FaReact />,
  'Angular': <FaAngular />,
  'Vue.js': <FaVuejs />,
  'Next.js': <FaReact />,
  'Gatsby': <FaReact />,
  'Nuxt.js': <FaVuejs />,
  'Redux': <FaReact />,
  'Vuex': <FaVuejs />,
  'Tailwind CSS': <SiCss3 />,
  'Bootstrap': <SiCss3 />,
  'JQuery': <SiJquery />,
};


const ProjectCard: React.FC<{ project: Project; index: number; techIcons: any; onOpenModal: (p: Project) => void }> = ({ project, index, techIcons, onOpenModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && project.images && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, project.images]);

  return (
    <div
      className={`project-card ${project.link ? 'clickable' : ''}`}
      style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img 
          src={(isHovered && project.images && project.images.length > 0) ? project.images[currentImageIndex] : project.image.url} 
          alt={project.title} 
          className={`project-image ${isHovered ? 'carousel-active' : ''}`} 
        />
        <div className="image-gradient"></div>
        {isHovered && project.images && project.images.length > 1 && (
          <div className="carousel-indicator">
            {project.images.map((_, i) => (
              <div key={i} className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`}></div>
            ))}
          </div>
        )}
      </div>
      
      <div className="project-details">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tech-used">
          {project.techUsed.split(', ').map((tech: string, i: number) => (
            <span key={i} className="tech-badge">
              {techIcons[tech] || "🔧"} {tech}
            </span>
          ))}
        </div>
      </div>

      {project.link && (
        <div className="view-project-overlay">
          <div className="overlay-content">
            <span className="overlay-text">Explore Project</span>
            <div className="overlay-icon">↗</div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void; techIcons: any }> = ({ project, onClose, techIcons }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const nextImage = () => {
    if (project.images) {
      setActiveImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project.images) {
      setActiveImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="modal-grid">
          <div className="modal-gallery">
            <div className="main-image-wrapper">
              <img 
                src={project.images && project.images.length > 0 ? project.images[activeImageIndex] : project.image.url} 
                alt={project.title} 
                className="modal-main-image"
              />
              {project.images && project.images.length > 1 && (
                <>
                  <button className="gallery-nav prev" onClick={prevImage}>&#10094;</button>
                  <button className="gallery-nav next" onClick={nextImage}>&#10095;</button>
                </>
              )}
            </div>
            
            {project.images && project.images.length > 1 && (
              <div className="thumbnail-strip">
                {project.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`Thumb ${i}`} 
                    className={`thumbnail-img ${i === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <h2 className="modal-title">{project.title}</h2>
              <div className="modal-tech-strip">
                {project.techUsed.split(', ').map((tech: string, i: number) => (
                  <span key={i} className="tech-badge">
                    {techIcons[tech] || "🔧"} {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{project.description}</p>
            </div>

            <div className="modal-footer">
              {project.link && (
                <button 
                  className="visit-button" 
                  onClick={() => window.open(project.link, '_blank')}
                >
                  Visit Project Website <span className="arrow">↗</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => { 
    async function fetchProjects() {
      const data = await getProjects();
      setProjects([...hardcodedProjects, ...data]);
    }
    
    fetchProjects()
  }, [])
  
  if (projects.length === 0) return <div>Loading...</div>;

  return (
    <div className="projects-container">
      <div className="projects-hero">
        <h1 className="hero-title">Published Projects</h1>
        <p className="hero-subtitle">A collection of my work in engineering, design, and fintech.</p>
        <div className="hero-line"></div>
      </div>
      
      <div className="projects-grid-wrapper">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              techIcons={techIcons} 
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          techIcons={techIcons}
        />
      )}
    </div>
  );
};

export default Projects;
