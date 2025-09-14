import { useEffect, useState } from "react";
import { ProjectCard } from "./sub-components/ProjectCard";
import { SkillsLinks } from "../Enums/SkillsEnum";
import "../styles/Projects.scss";

export const Projects = () => {
  const [projects] = useState([
    {
      title: "Portfolio - vite.dev",
      description: "Mon premier vrai projet en Front-End",
      projectLink: "https://github.com/Maddax10/Portfolio-vite.dev",
      imgPath: "portfolio-vite.dev.png",
      imgAlt: "Portfolio screen",
      skills: [SkillsLinks.HTML.path, SkillsLinks.SCSS.path, SkillsLinks.JAVASCRIPT.path, SkillsLinks.VITE_DEV.path],
    },
    {
      title: "Portfolio - react",
      description: "Adaptation du portfolio Vite.dev en React",
      projectLink: "https://github.com/Maddax10/portfolio-react",
      imgPath: "portfolio-react.png",
      imgAlt: "Portfolio screen",
      skills: [
        SkillsLinks.HTML.path,
        SkillsLinks.SCSS.path,
        SkillsLinks.TYPESCRIPT.path,
        SkillsLinks.VITE_DEV.path,
        SkillsLinks.REACT.path,
        SkillsLinks.NODE_JS.path,
        SkillsLinks.NO_SQL.path,
      ],
    },
  ]);

  useEffect(() => {
    console.log("⏫Projects component⏫");
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
