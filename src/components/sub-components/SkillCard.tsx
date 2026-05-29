import type { Skill } from '../../stores/models/skill';

type Props = { skill: Skill; index?: number };

/**
 * @param props skill | index (pour le décalage d'animation)
 * @returns html component
 */
export function SkillCard({ skill, index = 0 }: Props) {
	return (
		<div className="skill__card" style={{ animationDelay: `${index * 60}ms` }}>
			<div className="skill__logo">
				<img src={skill.image_path.toString()} alt={skill.name.toString()} />
			</div>
			<article className="skill__text">
				<h3>{skill.name}</h3>
				<p>{skill.description}</p>
			</article>
		</div>
	);
}
