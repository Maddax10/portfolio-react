import { useEffect } from 'react';
import { ProjectCard } from './sub-components/ProjectCard';
import { useProjectsStore } from '../stores/projects.stores.ts';
import { loading } from './sub-components/Loading.tsx';
import { loadingError } from './sub-components/LoadingError.tsx';
import { useReveal } from '../hooks/useReveal';

export const Projects = () => {
	const projectsStore = useProjectsStore();

	useEffect(() => {
		projectsStore.fetchProjects();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useReveal([projectsStore.projects.length]);

	return (
		<section className="section projects" id="projets">
			<header className="section__head" data-reveal>
				<span className="section__index">02</span>
				<h2 className="section__title">Projets</h2>
				<p className="section__lead">Une sélection de réalisations récentes.</p>
			</header>

			<div className="projects__cards">
				{projectsStore.loading === true ? loading() : projectsStore.error ? loadingError() : ''}

				{projectsStore.projects.map((project, index) => (
					<ProjectCard project={project} key={index} index={index} />
				))}
			</div>
		</section>
	);
};
