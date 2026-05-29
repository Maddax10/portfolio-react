import { useEffect } from 'react';

/**
 * Snap « franc » paginé entre sections, piloté en JS.
 *
 * - Bloc qui tient à l'écran : un scroll = saut au bloc voisin.
 * - Bloc plus haut que l'écran : on avance par pas d'~1 écran jusqu'à la fin
 *   du bloc, on s'y arrête, puis un nouveau scroll passe au bloc suivant.
 *
 * Fonctionne à la molette, au clavier et au doigt (le défilement natif est
 * neutralisé pour que chaque geste donne un saut net).
 */
export function useSectionSnap(selector = '.intro, .section, .footer') {
	useEffect(() => {
		const EDGE = 6; // tolérance px
		const SWIPE = 24; // distance px mini d'un swipe
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
		if (sections.length === 0) return;

		let locked = false;
		let rafId = 0;

		const scrollToPos = (top: number) => {
			const fromY = window.scrollY;
			const toY = Math.max(0, top);
			const dist = toY - fromY;
			cancelAnimationFrame(rafId);

			if (reduce || Math.abs(dist) < 2) {
				window.scrollTo(0, toY);
				locked = false;
				return;
			}

			locked = true;
			// durée courte proportionnelle à la distance (rapide mais fluide)
			const duration = Math.min(360, Math.max(160, Math.abs(dist) * 0.32));
			const start = performance.now();
			const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

			const step = (now: number) => {
				const t = Math.min(1, (now - start) / duration);
				window.scrollTo(0, fromY + dist * ease(t));
				if (t < 1) rafId = requestAnimationFrame(step);
				else locked = false;
			};
			rafId = requestAnimationFrame(step);
		};

		const currentIndex = () => {
			let idx = 0;
			sections.forEach((s, i) => {
				if (s.offsetTop <= window.scrollY + EDGE) idx = i;
			});
			return idx;
		};

		// Points d'arrêt d'un bloc : début, hauts de cartes (pour ne jamais
		// couper une carte), fin du bloc. Identiques dans les deux sens =>
		// ancrages cohérents au scroll haut/bas.
		const navEl = document.querySelector<HTMLElement>('.nav');
		const navOffset = () => (navEl?.offsetHeight ?? 0) + 12; // hauteur nav + marge

		const buildStops = (sec: HTMLElement, vh: number) => {
			const top = sec.offsetTop;
			const bottom = Math.max(top, sec.offsetTop + sec.offsetHeight - vh);
			if (bottom - top <= EDGE) return [top]; // bloc qui tient à l'écran

			const nav = navOffset();
			const items = Array.from(sec.querySelectorAll<HTMLElement>('[data-snap-item]'))
				.map((el) => {
					const r = el.getBoundingClientRect();
					return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
				})
				.sort((a, b) => a.top - b.top);

			// À chaque arrêt, le prochain ancrage = le haut de la PREMIÈRE carte
			// non entièrement visible (coupée en bas), placée juste sous la nav.
			// Aucune carte n'est sautée : chacune devient pleinement visible.
			const stops = [top];
			for (let guard = 0; guard < 100; guard++) {
				const last = stops[stops.length - 1];
				const viewportBottom = last + vh;
				const cut = items.find((it) => it.bottom > viewportBottom + EDGE);
				if (!cut) break; // tout le reste tient dans l'écran

				let next = Math.min(cut.top - nav, bottom);
				if (next <= last + EDGE) {
					// carte plus haute que l'écran : on avance d'un écran
					next = Math.min(bottom, last + (vh - nav));
					if (next <= last + EDGE) break;
				}
				stops.push(next);
				if (next >= bottom - EDGE) break;
			}
			return stops;
		};

		const jump = (dir: 1 | -1) => {
			if (locked) return;
			const vh = window.innerHeight;
			const idx = currentIndex();
			const stops = buildStops(sections[idx], vh);
			const y = window.scrollY;

			// arrêt le plus proche de la position actuelle
			let ci = 0;
			stops.forEach((s, i) => {
				if (Math.abs(s - y) < Math.abs(stops[ci] - y)) ci = i;
			});

			const ni = ci + dir;
			if (ni >= 0 && ni < stops.length) {
				scrollToPos(stops[ni]);
			} else if (dir > 0 && sections[idx + 1]) {
				// vers le bloc suivant : son début
				scrollToPos(sections[idx + 1].offsetTop);
			} else if (dir < 0 && sections[idx - 1]) {
				// vers le bloc précédent : sa FIN (réversibilité du parcours)
				const prev = buildStops(sections[idx - 1], vh);
				scrollToPos(prev[prev.length - 1]);
			}
		};

		//-------------------------------------------------- Molette (desktop)
		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // scroll horizontal
			e.preventDefault();
			if (Math.abs(e.deltaY) >= 2) jump(e.deltaY > 0 ? 1 : -1);
		};

		//-------------------------------------------------- Clavier
		const onKey = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement)?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA') return;
			const dir = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 : 0;
			if (!dir) return;
			e.preventDefault();
			jump(dir as 1 | -1);
		};

		//-------------------------------------------------- Tactile (mobile)
		let startY = 0;
		let lastY = 0;

		const onTouchStart = (e: TouchEvent) => {
			startY = lastY = e.touches[0].clientY;
		};

		const onTouchMove = (e: TouchEvent) => {
			if (e.touches.length !== 1) return; // laisse le pinch-zoom
			const y = e.touches[0].clientY;
			lastY = y;
			// En haut de page + tirage vers le bas : laisse le pull-to-refresh natif.
			if (y > startY && window.scrollY <= 0) return;
			e.preventDefault(); // sinon neutralise le défilement natif
		};

		const onTouchEnd = () => {
			const delta = startY - lastY;
			if (Math.abs(delta) >= SWIPE) jump(delta > 0 ? 1 : -1);
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('touchend', onTouchEnd);

		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
			cancelAnimationFrame(rafId);
		};
	}, [selector]);
}
