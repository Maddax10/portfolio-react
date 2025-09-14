import { useEffect, useState } from 'react';
import '../styles/Projects.scss'
export const Projects = () => {

    const [Projects] = useState([
        { title: "", description: "", projectLink: "", imgPath: "", imgAlt: "" }
    ])

    useEffect(() => {
        console.log("⏫Projects component⏫");

    }, [])
    return (
        <>
            <div className="projects" id="projets">
                <h1>Projets</h1>
                {/* ____cards____ */}
                <div className="projects__cards">
                    {/* portfolio */}
                    <div className="projects__card">
                        {/* div obligatoire pour la box-shadow inset du screen */}
                        <div className="projects__divScreen">
                            <img className="projects__screen" src="portfolio.png" alt="Portfolio screen" />
                        </div>
                        <p className="projects__description">Ce portfolio est mon premier vrai projet en Front-End.</p>
                        <a className="projects__link" href="https://github.com/Maddax10/Portfolio" target="_blank">
                            <img className="projects__linkLogo" src="open_link_in_new_tab.svg" alt="open the link in new tab" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}