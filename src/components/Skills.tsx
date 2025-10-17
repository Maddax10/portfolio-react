import { useEffect, useState } from 'react';
import { SkillCard } from './sub-components/SkillCard';
import { SkillsLinks as SE } from '../Enums/SkillsEnum';

/**
 * Pour chaque Skill, creation d'une card avec les infos contenus dans le useState img
 */
export const Skills = () => {
  const [skills] = useState([
    {
      title: SE.VITE_DEV.title,
      description: 'Environnement de développement Front-End',
      path: SE.VITE_DEV.path,
      alt: 'Vite.dev logo',
    },
    { title: SE.REACT.title, description: 'Environnement de développement Front-End', path: SE.REACT.path, alt: 'React logo' },
    { title: SE.VUEJS.title, description: 'Environnement de développement Front-End', path: SE.VUEJS.path, alt: 'VueJS logo' },
    { title: SE.HTML.title, description: 'Structure des données', path: SE.HTML.path, alt: 'HTML logo' },
    { title: SE.SCSS.title, description: 'Style de la structure', path: SE.SCSS.path, alt: 'Scss logo' },
    { title: SE.JAVASCRIPT.title, description: 'TypeScript en moins bien', path: SE.JAVASCRIPT.path, alt: 'JS logo' },
    { title: SE.TYPESCRIPT.title, description: 'JavaScript en mieu', path: SE.TYPESCRIPT.path, alt: 'TS logo' },
    { title: SE.NODE_JS.title, description: 'Développement | Production | API', path: SE.NODE_JS.path, alt: 'Node.JS logo' },
    { title: SE.SQLITE.title, description: 'Base de données', path: SE.SQLITE.path, alt: 'NoSQL logo' },
  ]);

  useEffect(() => {
    console.log('   useState(imgArray[SkillData])');
  }, [skills]);
  useEffect(() => {
    console.log('⏫Skills component⏫');
  }, []);

  return (
    <section className="skills" id="skills">
      <h1 className="skills__title">Skills</h1>
      {/* ____cards____ */}
      <div className="skills__cards">
        {skills.map((skillCard, index) => (
          <SkillCard key={index} skillCard={skillCard} />
        ))}
      </div>
    </section>
  );
};
