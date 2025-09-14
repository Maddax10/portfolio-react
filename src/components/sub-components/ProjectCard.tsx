import { useEffect } from "react";

type ProjectCard = {
  title: string;
  description: string;
  projectLink: string;
  imgPath: string;
  imgAlt: string;
  skills: string[];
};

type Props = { project: ProjectCard };
/**
 * @param props   title: string | description: string | projectLink: string | imgPath: string | imgAlt: string
 * @returns html component
 */
export const ProjectCard = (props: Props) => {
  const { project } = props;
  useEffect(() => {
    console.log("project.skills", project.skills);
  }, [project.skills]);
  useEffect(() => {
    console.log("  ProjectCard sub-component");
  }, []);

  return (
    <>
      <div className="projects__card">
        <h2 className="projects__title">{project.title}</h2>
        {/* div obligatoire pour la box-shadow inset du screen */}
        <div className="projects__divScreen">
          <img className="projects__screen" src={project.imgPath} alt={project.imgAlt} />
        </div>
        <p className="projects__description">{project.description}</p>
        <div className="projects__projectLogos">
          {project.skills.map((imgPath, index) => (
            <img className="projects__projectLogo" src={imgPath} alt="" key={index} />
          ))}
        </div>
        <a className="projects__link" href={project.projectLink} target="_blank">
          <img className="projects____githubLogo" src="open_link_in_new_tab.svg" alt="open the link in new tab" />
        </a>
      </div>
    </>
  );
};
