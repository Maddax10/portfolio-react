import { useEffect } from 'react'
import '../styles/Skills.scss'

export const Skills = () => {
    useEffect(() => {
        console.log("Skills component created")
    }, [])
    //Path and Alt for img balise

    return (
        <section className="skills" id="skills">
            <h1 className="skills__title">Skills</h1>
            {/* ____cards____ */}
            <div className="skills__cards">
                {/* HTML */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="HTML5_logo.svg" alt="HTML logo" />
                    </div>
                    <article className="skill__text">
                        <h1>HTML</h1>
                        <p>Structure des données</p>
                    </article>
                </div>
                {/* Sass */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="Sass_logo.svg" alt="Sass logo" />
                    </div>
                    <article className="skill__text">
                        <h1>Scss</h1>
                        <p>Style de la structure</p>
                    </article>
                </div>
                {/* JS */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="JavaScript_logo.svg" alt="JS logo" />
                    </div>
                    <article className="skill__text">
                        <h1>JavaScript</h1>
                        <p>TypeScript en moins bien</p>
                    </article>
                </div>
                {/* Vite.dev */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="vite_dev_logo.svg" alt="Vite.dev logo" />
                    </div>
                    <article className="skill__text">
                        <h1>Vite.dev</h1>
                        <p>Environnement de développement Front-End</p>
                    </article>
                </div>
                {/* Node.JS */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="nodejs_logo.svg" alt="Node.JS logo" />
                    </div>
                    <article className="skill__text">
                        <h1>Node.JS</h1>
                        <p>Développement & mise en production</p>
                        <p>API</p>
                    </article>
                </div>
                {/* NoSQL */}
                <div className="skill__card">
                    <div className="skill__logo">
                        <img src="NoSQL.svg" alt="NoSQL logo" />
                    </div>
                    <article className="skill__text">
                        <h1>NoSQL</h1>
                        <p>Base de données</p>
                    </article>
                </div>
            </div>
        </section>

    )
}