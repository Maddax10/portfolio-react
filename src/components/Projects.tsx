import { useEffect, useState } from 'react';
import { ProjectCard } from './sub-components/ProjectCard';
import { useProjectsStore } from '../stores/projects.stores.ts';

export const Projects = () => {
	const projectsStore = useProjectsStore();

	const loadProjects = async () => {
		projectsStore.fetchProjects();
	};
	useEffect(() => {
		console.log('⏫Projects component⏫');

		loadProjects();
	}, []);
	return (
		<>
			<div className="projects" id="projets">
				<h1>Projets</h1>
				<div className="projects__cards">
					{/* ____projects cards____ */}
					{projectsStore.projects.map((project, index) => (
						<ProjectCard project={project} key={index} />
					))}
				</div>
			</div>
		</>
	);
};
