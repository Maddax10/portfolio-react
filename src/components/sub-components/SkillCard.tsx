import { useEffect } from "react";

type SkillCard = {
  title: string,
  description: string,
  path: string,
  alt: string
}
type Props = { skillCard: SkillCard };

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
