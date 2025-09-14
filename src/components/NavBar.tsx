import { useEffect } from "react"
import '../styles/NavBar.scss'
export const NavBar = () => {
    useEffect(() => {
        console.log("NavBar component Created");
    },
        []
    )
    return (
        <>
            <nav className="nav">
                <input type="checkbox" id="trigger" className="nav__trigger" />
                <label htmlFor="trigger" className="nav__logo">

                    <span className="nav__icon"></span>
                    <span className="nav__icon"></span>
                    <span className="nav__icon"></span>

                </label>
                <ul className="nav__navMobile">
                    <li><a href="#intro">Home</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projets">Projets</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <ul className="nav__navDesktop hidden">
                    <li><a href="#index" className="activePage">Home</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projets">Projets</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

        </>
    )
}