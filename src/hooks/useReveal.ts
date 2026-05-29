import { useEffect } from 'react';

/**
 * Ajoute la classe `is-visible` aux éléments porteurs de l'attribut
 * `data-reveal` lorsqu'ils entrent dans le viewport (reveal au scroll).
 * Sans IntersectionObserver (ou en `prefers-reduced-motion`), tout est
 * affiché immédiatement. Ré-exécuté quand `deps` change pour prendre en
 * compte les éléments montés après un fetch.
 */
export function useReveal(deps: unknown[] = []) {
	useEffect(() => {
		const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
		if (els.length === 0) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced || !('IntersectionObserver' in window)) {
			els.forEach((el) => el.classList.add('is-visible'));
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);

		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
