import { useEffect } from 'react';

/**
 * Snap « franc » entre sections, piloté en JS.
 *
 * - Desktop : un cran de molette / une flèche saute à la section voisine.
 * - Mobile : un léger swipe du doigt saute à la section voisine (on neutralise
 *   l'inertie tactile native pour que ce soit net).
 *
 * Les sections plus hautes que l'écran restent lisibles : on défile
 * librement à l'intérieur, et le saut ne se déclenche qu'aux bords.
 */
export function useSectionSnap(selector = '.intro, .section, .footer') {
	useEffect(() => {
		const NAV = 80; // doit correspondre à scroll-margin-top des sections
		const EDGE = 6; // tolérance px pour détecter les bords
		const SWIPE = 24; // distance px mini d'un swipe pour déclencher
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
		if (sections.length === 0) return;

		let locked = false;
		let lockTimer: ReturnType<typeof setTimeout>;

		const currentIndex = () => {
			let idx = 0;
			sections.forEach((s, i) => {
				if (s.offsetTop - NAV <= window.scrollY + EDGE) idx = i;
			});
			return idx;
		};

		const goTo = (i: number) => {
			const target = sections[i];
			if (!target) return;
			locked = true;
			target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
			clearTimeout(lockTimer);
			lockTimer = setTimeout(() => (locked = false), reduce ? 80 : 200);
		};

		// Le saut est-il autorisé dans cette direction depuis la section courante ?
		// (faux = on laisse le défilement natif libre dans une section trop haute)
		const canJump = (dir: 1 | -1) => {
			const sec = sections[currentIndex()];
			if (sec.offsetHeight <= window.innerHeight - NAV) return true;
			const atTop = window.scrollY <= sec.offsetTop - NAV + EDGE;
			const atBottom = window.scrollY + window.innerHeight >= sec.offsetTop + sec.offsetHeight - EDGE;
			return dir > 0 ? atBottom : atTop;
		};

		const jump = (dir: 1 | -1) => goTo(currentIndex() + dir);

		//-------------------------------------------------- Molette (desktop)
		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || Math.abs(e.deltaY) < 2) return;
			const dir = e.deltaY > 0 ? 1 : -1;
			if (!canJump(dir)) return;
			e.preventDefault();
			if (!locked) jump(dir);
		};

		//-------------------------------------------------- Clavier
		const onKey = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement)?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA') return;
			const dir = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 : 0;
			if (!dir || !canJump(dir as 1 | -1)) return;
			e.preventDefault();
			if (!locked) jump(dir as 1 | -1);
		};

		//-------------------------------------------------- Tactile (mobile)
		let startY = 0;
		let lastY = 0;
		let hijackDir: 1 | -1 | 0 = 0;

		const onTouchStart = (e: TouchEvent) => {
			startY = lastY = e.touches[0].clientY;
			hijackDir = 0;
		};

		const onTouchMove = (e: TouchEvent) => {
			const y = e.touches[0].clientY;
			lastY = y;
			const dir: 1 | -1 = startY - y > 0 ? 1 : -1; // swipe vers le haut = section suivante
			if (locked) {
				e.preventDefault(); // on fige pendant l'animation
				return;
			}
			if (canJump(dir)) {
				hijackDir = dir; // on neutralise l'inertie native pour un saut net
				e.preventDefault();
			} else {
				hijackDir = 0; // défilement natif libre dans une section trop haute
			}
		};

		const onTouchEnd = () => {
			if (locked || !hijackDir) return;
			if (Math.abs(startY - lastY) >= SWIPE) jump(hijackDir);
			hijackDir = 0;
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
