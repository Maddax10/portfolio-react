import { useEffect, type RefObject } from 'react';

type Options = { min?: number; max?: number };

/**
 * Adapte la taille de police d'un titre multi-lignes pour que sa ligne la
 * plus large remplisse exactement 100 % de la largeur du conteneur, sans
 * jamais déborder. Chaque enfant direct (`.intro__line`) est une ligne.
 *
 * Recalcul au redimensionnement (ResizeObserver) et une fois les polices
 * chargées (les métriques de Syne diffèrent de la police de repli).
 */
export function useFitText(ref: RefObject<HTMLElement | null>, { min = 28, max = 144 }: Options = {}) {
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const lines = Array.from(el.children) as HTMLElement[];
		if (lines.length === 0) return;

		const fit = () => {
			const containerWidth = el.clientWidth;
			if (!containerWidth) return;

			// Mesure les lignes à la taille max, puis on réduit au ratio nécessaire.
			el.style.fontSize = `${max}px`;
			let widest = 0;
			for (const line of lines) widest = Math.max(widest, line.scrollWidth);
			if (widest === 0) return;

			const size = Math.max(min, Math.min(max, (containerWidth / widest) * max));
			el.style.fontSize = `${size}px`;
		};

		fit();

		const ro = new ResizeObserver(fit);
		ro.observe(el);
		if (el.parentElement) ro.observe(el.parentElement);
		window.addEventListener('resize', fit);
		document.fonts?.ready.then(fit).catch(() => {});

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', fit);
		};
	}, [ref, min, max]);
}
