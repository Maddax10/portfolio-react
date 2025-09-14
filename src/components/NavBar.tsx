import { useEffect } from "react"
import { NavBarLogo } from "./sub-components/NavBarLogo"
import '../styles/NavBar.scss'
export const NavBar = () => {
    useEffect(() => {
        console.log("⏫NavBar component Created⏫");
    },
        []
    )
    return (
        <>
            <nav className="nav">
                <NavBarLogo />

                {/* Nav mobile */}
                <ul className="nav__navMobile">
                    <li><a href="#intro">Home</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projets">Projets</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                {/* Nav desktop */}
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