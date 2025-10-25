import { useEffect } from 'react';
import { SkillCard } from './sub-components/SkillCard';
import { useSkillsStore } from '../stores/skills.stores';
import { loading } from './sub-components/Loading';
import { loadingError } from './sub-components/LoadingError';

/**
 * Pour chaque Skill, creation d'une card avec les infos contenus dans le useState img
 */
export const Skills = () => {
	const skillStore = useSkillsStore();

	const loadSkills = async () => {
		skillStore.fetchSkills();
	};
	useEffect(() => {
		loadSkills();
		// console.log('⏫Skills component⏫');
	}, []);

	return (
		<section className="skills" id="skills">
			<h1 className="skills__title">Skills</h1>
			{/* ____cards____ */}
			<div className="skills__cards">
				{skillStore.loading === true ? loading() : skillStore.error ? loadingError() : ''}
				{skillStore.skills.map((skill, index) => (
					<SkillCard key={index} skill={skill} />
				))}
			</div>
		</section>
	);
};
