import { useEffect } from 'react';
import { NavBarLogo } from './sub-components/NavBarLogo';
export const NavBar = () => {
	useEffect(() => {
		// console.log('⏫NavBar component Created⏫');
	}, []);
	return (
		<>
			<nav className="nav">
				<NavBarLogo />

				{/* Nav mobile */}
				<ul className="nav__navMobile">
					<li>
						<a href="#intro">Home</a>
					</li>
					<li>
						<a href="#skills">Skills</a>
					</li>
					<li>
						<a href="#projets">Projets</a>
					</li>
					<li>
						<a href="#about">À propos</a>
					</li>
					<li>
						<a href="#informations">Informations</a>
					</li>
				</ul>

				{/* Nav desktop */}
				<ul className="nav__navDesktop">
					<li>
						<a href="#intro">Home</a>
					</li>
					<li>
						<a href="#skills">Skills</a>
					</li>
					<li>
						<a href="#projets">Projets</a>
					</li>
					<li>
						<a href="#about">À propos</a>
					</li>
					<li>
						<a href="#informations">Informations</a>
					</li>
				</ul>
			</nav>
		</>
	);
};
