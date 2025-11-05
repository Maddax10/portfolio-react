import { useEffect } from 'react';
import type { Skill } from '../../stores/models/skill';
/**
 * Création d'un type d'objet
 */
/**
 * initialisation des propriétés de ma card
 */
type Props = { skill: Skill };

/**
 *
 * @param props title:string | description:string | path:string | alt:string
 * @returns html component
 */
export function SkillCard(props: Props) {
	const { skill } = props;

	useEffect(() => {
		// console.log('  SkillCard Sub-component');
	}, []);

	return (
		<div className="skill__card">
			<div className="skill__logo">
				<img src={skill.image_path.toString()} alt={skill.name.toString()} />
			</div>
			<article className="skill__text">
				<h1>{skill.name}</h1>
				<p>{skill.description}</p>
			</article>
		</div>
	);
}
