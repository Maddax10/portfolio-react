export const About = () => {
	return (
		<section className="section about" id="about">
			<header className="section__head" data-reveal>
				<span className="section__index">03</span>
				<h2 className="section__title">À propos</h2>
			</header>

			<div className="about__card" data-reveal>
				<div className="about__media">
					<div className="about__image">
						<img src="/images/my_shity-face.JPG" alt="Portrait de Maximilien Michon" />
						<div className="about__imageOverlay" />
					</div>
				</div>

				<div className="about__content">
					<h3 className="about__name">Michon Maximilien</h3>
					<div className="about__personalTxt">
						<p>Hey, j'ai 27 ans et je suis développeur Front-End junior basé sur Ath, dans le Hainaut.</p>
						<p>J'adore comprendre les choses, bidouiller et mettre en pratique.</p>
						<p>
							Au quotidien j'aime les immersions en VR, l'hardware, les jeux-vidéos{' '}
							<span className="about__little">et une ou deux tasses de thé</span>
						</p>
						<p>Je suis aussi l'heureux propriétaire d'une Ford Fiesta de 2014 ainsi que de mon permis B.</p>
					</div>

					<ul className="about__facts">
						<li>
							<strong>27</strong>
							<span>ans</span>
						</li>
						<li>
							<strong>Ath</strong>
							<span>Hainaut, BE</span>
						</li>
						<li>
							<strong>Permis B</strong>
							<span>mobile</span>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};
