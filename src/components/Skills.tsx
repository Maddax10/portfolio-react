import { useEffect } from 'react';
import { SkillCard } from './sub-components/SkillCard';
import { useSkillsStore } from '../stores/skills.stores';
import { loading } from './sub-components/Loading';
import { loadingError } from './sub-components/LoadingError';
import { useReveal } from '../hooks/useReveal';

/**
 * Pour chaque Skill, creation d'une card avec les infos contenus dans le useState img
 */
export const Skills = () => {
	const skillStore = useSkillsStore();

	useEffect(() => {
		skillStore.fetchSkills();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useReveal([skillStore.skills.length]);

	return (
		<section className="section skills" id="skills">
			<header className="section__head" data-reveal>
				<span className="section__index">01</span>
				<h2 className="section__title">Skills</h2>
				<p className="section__lead">Les outils que je manie au quotidien.</p>
			</header>

			<div className="skills__cards">
				{skillStore.loading === true ? loading() : skillStore.error ? loadingError() : ''}
				{skillStore.skills.map((skill, index) => (
					<SkillCard key={index} skill={skill} index={index} />
				))}
			</div>
		</section>
	);
};
