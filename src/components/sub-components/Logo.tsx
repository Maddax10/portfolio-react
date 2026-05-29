type Props = { className?: string };

/**
 * Emblème « Velocity ring » : anneau-jauge ouvert en dégradé ambre→ember,
 * double chevron de vitesse et traînées, pour une identité dynamique
 * (esprit Need for Speed) aux couleurs du portfolio.
 */
export const Logo = ({ className }: Props) => (
	<svg className={className} viewBox="0 0 48 48" fill="none" role="img" aria-label="Logo Maximilien">
		<defs>
			<linearGradient id="velGrad" x1="8" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
				<stop stopColor="#ffc24d" />
				<stop offset="0.5" stopColor="#ffa600" />
				<stop offset="1" stopColor="#ff3b1f" />
			</linearGradient>
		</defs>

		{/* anneau-jauge ouvert sur la gauche */}
		<path
			className="logo__ring"
			d="M12.9 14.82 A16 16 0 1 1 12.9 33.18"
			stroke="url(#velGrad)"
			strokeWidth="3.4"
			strokeLinecap="round"
		/>

		{/* traînées de vitesse sortant de l'ouverture */}
		<g className="logo__streaks" stroke="#ffa600" strokeWidth="2.6" strokeLinecap="round">
			<line x1="11" y1="18" x2="3" y2="18" opacity="0.9" />
			<line x1="12" y1="24" x2="1" y2="24" opacity="0.6" />
			<line x1="11" y1="30" x2="4" y2="30" opacity="0.32" />
		</g>

		{/* double chevron de vitesse */}
		<path
			d="M17 18 L23 24 L17 30"
			stroke="url(#velGrad)"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			opacity="0.55"
		/>
		<path
			d="M24 17 L32 24 L24 31"
			stroke="url(#velGrad)"
			strokeWidth="3.4"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
