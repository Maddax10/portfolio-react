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
		const SWIPE = 16; // distance px mini d'un swipe pour déclencher
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
			const duration = Math.min(200, Math.max(90, Math.abs(dist) * 0.18));
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

				let next: number;
				if (cut) {
					next = Math.min(cut.top - nav, bottom); // haut de la 1re carte coupée
				} else if (last < bottom - EDGE) {
					// plus de carte coupée mais bas du bloc pas atteint (ex. « À propos »
					// sans cartes, ou bas de bloc) : on pagine jusqu'à la fin
					next = Math.min(bottom, last + (vh - nav));
				} else {
					break; // tout le bloc a été vu
				}

				if (next <= last + EDGE) {
					// contenu plus haut que l'écran : on force un écran
					next = Math.min(bottom, last + (vh - nav));
					if (next <= last + EDGE) break;
				}
				stops.push(next);
				if (next >= bottom - EDGE) break;
			}
			return stops;
		};

		// Liste globale ordonnée de TOUS les points d'arrêt (toutes sections),
		// bornée au scroll max : gère les sections courtes (footer) qui ne
		// peuvent pas atteindre leur offsetTop, et rend le parcours réversible.
		const allStops = () => {
			const vh = window.innerHeight;
			const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
			const raw: number[] = [];
			sections.forEach((sec) => buildStops(sec, vh).forEach((s) => raw.push(Math.min(Math.max(0, s), maxScroll))));
			raw.sort((a, b) => a - b);
			const out: number[] = [];
			for (const s of raw) if (out.length === 0 || s - out[out.length - 1] > EDGE) out.push(s);
			return out;
		};

		const jump = (dir: 1 | -1) => {
			if (locked) return;
			const stops = allStops();
			const y = window.scrollY;
			let ci = 0;
			stops.forEach((s, i) => {
				if (Math.abs(s - y) < Math.abs(stops[ci] - y)) ci = i;
			});
			const ni = ci + dir;
			if (ni >= 0 && ni < stops.length) scrollToPos(stops[ni]);
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
		let gestureJumped = false;

		const onTouchStart = (e: TouchEvent) => {
			startY = e.touches[0].clientY;
			gestureJumped = false;
		};

		const onTouchMove = (e: TouchEvent) => {
			if (e.touches.length !== 1) return; // laisse le pinch-zoom
			const y = e.touches[0].clientY;
			// En haut de page + tirage vers le bas : laisse le pull-to-refresh natif.
			if (y > startY && window.scrollY <= 0) return;
			e.preventDefault(); // neutralise le défilement natif
			// Déclenche dès le mouvement (pas au relâchement) => démarrage instantané.
			if (gestureJumped || locked) return;
			const delta = startY - y;
			if (Math.abs(delta) >= SWIPE) {
				gestureJumped = true;
				jump(delta > 0 ? 1 : -1);
			}
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });

		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			cancelAnimationFrame(rafId);
		};
	}, [selector]);
}
