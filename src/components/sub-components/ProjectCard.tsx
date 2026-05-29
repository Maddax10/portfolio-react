import type { Project } from '../../stores/models/project';

type Props = { project: Project; index?: number };

/**
 * @param props project | index (pour le décalage d'animation)
 * @returns html component
 */
export const ProjectCard = ({ project, index = 0 }: Props) => {
	return (
		<article className="projects__card" style={{ animationDelay: `${index * 90}ms` }}>
			<div className="projects__media">
				<img className="projects__screen" src={project.image_path} alt={project.title} loading="lazy" />
				<div className="projects__mediaShade" />
				<h3 className="projects__title">{project.title}</h3>
			</div>

			<div className="projects__body">
				<p className="projects__description">{project.description}</p>

				<div className="projects__skills">
					{project.skills.map((skill, i) => (
						<span className="projects__chip" key={i}>
							<img src={skill.image_path.toString()} alt={skill.name.toString()} />
						</span>
					))}
				</div>

				<a className="projects__link" href={project.github} target="_blank" rel="noreferrer">
					Voir le code
					<img src="/logos/open_link_in_new_tab.svg" alt="" aria-hidden="true" />
				</a>
			</div>
		</article>
	);
};
