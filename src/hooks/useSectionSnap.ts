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
		let lockTimer: ReturnType<typeof setTimeout>;

		const scrollToPos = (top: number) => {
			locked = true;
			window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
			clearTimeout(lockTimer);
			lockTimer = setTimeout(() => (locked = false), reduce ? 80 : 200);
		};

		const currentIndex = () => {
			let idx = 0;
			sections.forEach((s, i) => {
				if (s.offsetTop <= window.scrollY + EDGE) idx = i;
			});
			return idx;
		};

		const jump = (dir: 1 | -1) => {
			if (locked) return;
			const vh = window.innerHeight;
			const idx = currentIndex();
			const sec = sections[idx];
			const top = sec.offsetTop;
			const bottom = Math.max(top, sec.offsetTop + sec.offsetHeight - vh); // fin du bloc
			const y = window.scrollY;
			const STEP = vh * 0.9;

			if (dir > 0) {
				// avance dans un bloc haut jusqu'à sa fin, sinon bloc suivant
				if (bottom - y > EDGE) scrollToPos(Math.min(bottom, y + STEP));
				else if (sections[idx + 1]) scrollToPos(sections[idx + 1].offsetTop);
			} else {
				// remonte dans un bloc haut jusqu'à son début, sinon bloc précédent
				if (y - top > EDGE) scrollToPos(Math.max(top, y - STEP));
				else if (sections[idx - 1]) scrollToPos(sections[idx - 1].offsetTop);
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
			lastY = e.touches[0].clientY;
			e.preventDefault(); // neutralise le défilement natif
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
			clearTimeout(lockTimer);
		};
	}, [selector]);
}
