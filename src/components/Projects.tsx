import { useEffect, useState } from 'react';
import { ProjectCard } from './sub-components/ProjectCard';
import { SkillsLinks } from '../Enums/SkillsEnum';

export const Projects = () => {
  const [projects] = useState([
    {
      title: 'Portfolio - Vite',
      description: 'Mon premier vrai projet en Front-End',
      projectLink: 'https://github.com/Maddax10/Portfolio-vite.dev',
      imgPath: 'portfolio.png',
      imgAlt: 'Portfolio screen',
      skills: [SkillsLinks.HTML.path, SkillsLinks.SCSS.path, SkillsLinks.JAVASCRIPT.path, SkillsLinks.VITE_DEV.path],
    },
    {
      title: 'Portfolio - react',
      description: 'Adaptation du portfolio Vite.dev en React',
      projectLink: 'https://github.com/Maddax10/portfolio-react',
      imgPath: 'portfolio.png',
      imgAlt: 'Portfolio screen',
      skills: [SkillsLinks.HTML.path, SkillsLinks.SCSS.path, SkillsLinks.TYPESCRIPT.path, SkillsLinks.VITE_DEV.path, SkillsLinks.REACT.path],
    },
  ]);

  useEffect(() => {
    console.log('⏫Projects component⏫');
  }, []);
  return (
    <>
      <div className="projects" id="projets">
        <h1>Projets</h1>
        <div className="projects__cards">
          {/* ____projects cards____ */}
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
