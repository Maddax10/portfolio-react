import { useRef } from 'react';
import { useFitText } from '../hooks/useFitText';

export const Intro = () => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	useFitText(titleRef, { min: 30, max: 150 });

	return (
		<section className="intro" id="intro">
			<div className="intro__grid" aria-hidden="true" />

			<div className="intro__inner">
				<span className="intro__eyebrow">
					<span className="intro__dot" /> Développeur Front-End · Ath, Belgique
				</span>

				<h1 className="intro__title" ref={titleRef}>
					<span className="intro__line">THE WEB</span>
					<span className="intro__line intro__accent">QUALITY</span>
				</h1>

				<p className="intro__sub">
					<em>By hands.</em> Des interfaces soignées, du détail jusqu'au pixel.
				</p>

				<div className="intro__cta">
					<a className="btn btn--solid" href="#projets">
						Voir les projets
					</a>
					<a className="btn btn--ghost" href="#informations">
						Me contacter
					</a>
				</div>
			</div>

			<a className="intro__scroll" href="#skills" aria-label="Défiler vers le bas">
				<span>Scroll</span>
				<span className="intro__scrollLine" />
			</a>
		</section>
	);
};
