import { useEffect } from 'react';

/**
 * Le scroll-snap CSS gère mal les sections plus hautes que l'écran
 * (impossible d'atteindre leur bas, le snap « tire » vers le haut).
 *
 * Ce hook désactive le snap (`.snap-disabled`) sur les sections dont la
 * hauteur dépasse le viewport, et le réactive sinon. Le recalcul se fait
 * au redimensionnement et à chaque changement de hauteur de section
 * (contenu asynchrone) grâce à un ResizeObserver.
 */
export function useSnapFit(selector = '.intro, .section, .footer') {
	useEffect(() => {
		const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
		if (targets.length === 0) return;

		const NAV_OFFSET = 80;
		const evaluate = () => {
			const available = window.innerHeight - NAV_OFFSET;
			targets.forEach((el) => {
				el.classList.toggle('snap-disabled', el.offsetHeight > available);
			});
		};

		evaluate();

		const ro = new ResizeObserver(evaluate);
		targets.forEach((t) => ro.observe(t));
		window.addEventListener('resize', evaluate);

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', evaluate);
		};
	}, [selector]);
}
