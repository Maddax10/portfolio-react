type Props = {
	open: boolean;
	onToggle: () => void;
};

export const NavBarLogo = ({ open, onToggle }: Props) => {
	return (
		<button
			type="button"
			className="nav__burger"
			aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={open}
			onClick={onToggle}
		>
			<span className="nav__burgerLine" />
			<span className="nav__burgerLine" />
			<span className="nav__burgerLine" />
		</button>
	);
};
