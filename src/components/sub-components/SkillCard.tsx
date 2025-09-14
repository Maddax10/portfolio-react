import { useEffect } from "react";
/** 
 * Création d'un type d'objet
 */
type SkillCard = {
  title: string,
  description: string,
  path: string,
  alt: string
}
/**
 * initialisation des propriétés de ma card
 */
type Props = { skillCard: SkillCard };

/**
 * 
 * @param props SkillCard(title:string, description:string, path:string, alt:string)
 * @returns html component
 */
export function SkillCard(props: Props) {
  const { skillCard } = props;

  useEffect(() => {
    console.log("SkillCard Sub-component")
  }, [])

  return (
    <div className="skill__card">
      <div className="skill__logo">
        <img src={skillCard.path} alt={skillCard.alt} />
      </div>
      <article className="skill__text">
        <h1>{skillCard.title}</h1>
        <p>{skillCard.description}</p>
      </article>
    </div>
  );
}
