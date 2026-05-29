export const Footer = () => {
	return (
		<footer className="footer" id="informations">
			<div className="footer__cta">
				<p className="footer__kicker">Disponible pour de nouveaux projets</p>
				<h2 className="footer__title">Travaillons ensemble.</h2>
				<a className="footer__mail" href="mailto:maximilien01993@gmail.com">
					maximilien01993@gmail.com
				</a>
			</div>

			<div className="footer__grid">
				<div className="footer__col">
					<span className="footer__label">Coordonnées</span>
					<ul>
						<li>Michon Maximilien</li>
						<li>Ath, Hainaut · Belgique</li>
					</ul>
				</div>

				<div className="footer__col">
					<span className="footer__label">Liens</span>
					<ul>
						<li>
							<a href="https://www.linkedin.com/in/maximilien-michon/" target="_blank" rel="noreferrer">
								LinkedIn
							</a>
						</li>
						<li>
							<a href="https://github.com/Maddax10?tab=repositories" target="_blank" rel="noreferrer">
								GitHub
							</a>
						</li>
						<li>
							<a href="mailto:maximilien01993@gmail.com">Email</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="footer__copyright">
				<span>Michon Maximilien</span>
				<span>&copy; 2025 — Tous droits réservés</span>
			</div>
		</footer>
	);
};
