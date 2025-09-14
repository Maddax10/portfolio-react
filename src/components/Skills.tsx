import { useEffect, useState } from 'react'
import '../styles/Skills.scss'
import { SkillCard } from './sub-components/SkillCard'

export const Skills = () => {

    const [img] = useState([
        { title: "Vite.dev", description: "Environnement de développement Front-End", path: "Vite_Dev_logo.svg", alt: "Vite.dev logo" },
        { title: "React", description: "Environnement de développement Front-End", path: "React_logo.svg", alt: "React logo" },
        { title: "HTML", description: "Structure des données", path: "HTML5_logo.svg", alt: "HTML logo" },
        { title: "Scss", description: "Style de la structure", path: "Scss_logo.svg", alt: "Scss logo" },
        { title: "JavaScript", description: "TypeScript en moins bien", path: "JavaScript_logo.svg", alt: "JS logo" },
        { title: "TypeScript", description: "JavaScript en mieu", path: "TypeScript_logo.svg", alt: "TS logo" },
        { title: "Node.JS", description: "Développement | Production | API", path: "NodeJS_logo.svg", alt: "Node.JS logo" },
        { title: "NoSQL", description: "Base de données", path: "NoSQL.svg", alt: "NoSQL logo" },
    ]);

    useEffect(() => {
        console.log("Skills component")
    }, [])

    useEffect(() => {
        console.log("useState(imgArray[SkillData])")
    }, [img])
    //Path and Alt for img balise

    return (
        <section className="skills" id="skills">
            <h1 className="skills__title">Skills</h1>
            {/* ____cards____ */}
            {
                img.map(
                    (skillCard, index) => (
                        <SkillCard key={index} skillCard={skillCard} />
                    )
                )
            }
        </section>
    )
}