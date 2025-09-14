import { useEffect, useState } from "react";
import { SkillCard } from "./sub-components/SkillCard";
import "../styles/Skills.scss";
import { SkillsLinks } from "../Enums/SkillsEnum";

/**
 * Pour chaque Skill, creation d'une card avec les infos contenus dans le useState img
 */
export const Skills = () => {
  const [img] = useState([
    {
      title: SkillsLinks.VITE_DEV.title,
      description: "Environnement de développement Front-End",
      path: SkillsLinks.VITE_DEV.path,
      alt: "Vite.dev logo",
    },
    { title: SkillsLinks.REACT.title, description: "Environnement de développement Front-End", path: SkillsLinks.REACT.path, alt: "React logo" },
    { title: SkillsLinks.HTML.title, description: "Structure des données", path: SkillsLinks.HTML.path, alt: "HTML logo" },
    { title: SkillsLinks.SCSS.title, description: "Style de la structure", path: SkillsLinks.SCSS.path, alt: "Scss logo" },
    { title: SkillsLinks.JAVASCRIPT.title, description: "TypeScript en moins bien", path: SkillsLinks.JAVASCRIPT.path, alt: "JS logo" },
    { title: SkillsLinks.TYPESCRIPT.title, description: "JavaScript en mieu", path: SkillsLinks.TYPESCRIPT.path, alt: "TS logo" },
    { title: SkillsLinks.NODE_JS.title, description: "Développement | Production | API", path: SkillsLinks.NODE_JS.path, alt: "Node.JS logo" },
    { title: SkillsLinks.NO_SQL.title, description: "Base de données", path: SkillsLinks.NO_SQL.path, alt: "NoSQL logo" },
  ]);

  useEffect(() => {
    console.log("   useState(imgArray[SkillData])");
  }, [img]);
  useEffect(() => {
    console.log("⏫Skills component⏫");
  }, []);

  return (
    <section className="skills" id="skills">
      <h1 className="skills__title">Skills</h1>
      {/* ____cards____ */}
      {img.map((skillCard, index) => (
        <SkillCard key={index} skillCard={skillCard} />
      ))}
    </section>
  );
};
