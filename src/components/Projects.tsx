import { useEffect } from 'react';
import { ProjectCard } from './sub-components/ProjectCard';
import { useProjectsStore } from '../stores/projects.stores.ts';
import { loading } from './sub-components/Loading.tsx';
import { loadingError } from './sub-components/LoadingError.tsx';

export const Projects = () => {
	const projectsStore = useProjectsStore();

	const loadProjects = async () => {
		projectsStore.fetchProjects();
	};
	useEffect(() => {
		// console.log('⏫Projects component⏫');

		loadProjects();
	}, []);
	return (
		<>
			<div className="projects" id="projets">
				<h1>Projets</h1>
				<div className="projects__cards">
					{projectsStore.loading === true ? loading() : projectsStore.error ? loadingError() : ''}

					{/* ____projects cards____ */}
					{projectsStore.projects.map((project, index) => (
						<ProjectCard project={project} key={index} />
					))}
				</div>
			</div>
		</>
	);
};
