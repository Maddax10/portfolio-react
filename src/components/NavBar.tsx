import { useState } from 'react';
import { NavBarLogo } from './sub-components/NavBarLogo';
import { useScrollSpy } from '../hooks/useScrollSpy';

const LINKS = [
	{ id: 'intro', label: 'Home' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'projets', label: 'Projets' },
	{ id: 'about', label: 'À propos' },
	{ id: 'informations', label: 'Infos' },
];

const LINK_IDS = LINKS.map((l) => l.id);

export const NavBar = () => {
	const [open, setOpen] = useState(false);
	const active = useScrollSpy(LINK_IDS);

	const close = () => setOpen(false);

	return (
		<nav className={`nav ${open ? 'nav--open' : ''}`}>
			<a className="nav__brand" href="#intro" onClick={close}>
				Maximilien<span>.</span>
			</a>

			<NavBarLogo open={open} onToggle={() => setOpen((v) => !v)} />

			<ul className="nav__menu">
				{LINKS.map((link) => (
					<li key={link.id}>
						<a
							href={`#${link.id}`}
							onClick={close}
							className={active === link.id ? 'is-active' : ''}
							aria-current={active === link.id ? 'page' : undefined}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
