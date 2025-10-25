import { useEffect } from 'react';
import type { Project } from '../../stores/models/project';

type Props = { project: Project };
/**
 * @param props   title: string | description: string | projectLink: string | imgPath: string | imgAlt: string
 * @returns html component
 */
export const ProjectCard = (props: Props) => {
	const { project } = props;

	useEffect(() => {
		// console.log('project', project);
	}, [project]);

	useEffect(() => {
		console.log('  ProjectCard sub-component');
	}, []);

	return (
		<>
			<div className="projects__card">
				<h2 className="projects__title">{project.title}</h2>
				{/* div obligatoire pour la box-shadow inset du screen */}
				<div className="projects__divScreen">
					<img className="projects__screen" src={project.image_path} />
				</div>
				<p className="projects__description">{project.description}</p>
				<div className="projects__skills">
					{project.skills.map((skill, index) => (
						<img className="projects__skillsImg" src={skill.image_path.toString()} alt={skill.name.toString()} key={index} />
					))}
				</div>
				<div className="projects__linkScreen">
					<a className="projects__link" href={project.github} target="_blank">
						<img className="projects__githubLogo" src="/logos/open_link_in_new_tab.svg" alt="open the link in new tab" />
					</a>
				</div>
			</div>
		</>
	);
};
