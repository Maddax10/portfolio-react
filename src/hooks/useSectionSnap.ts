import { useEffect } from 'react';

/**
 * Snap « franc » entre sections, piloté en JS (uniquement desktop).
 *
 * Un cran de molette / une flèche fait sauter directement à la section
 * suivante ou précédente. Les sections plus hautes que l'écran restent
 * lisibles : on défile librement à l'intérieur, et le saut ne se déclenche
 * qu'aux bords (haut/bas) de la section.
 */
export function useSectionSnap(selector = '.intro, .section, .footer') {
	useEffect(() => {
		if (!window.matchMedia('(min-width: 800px)').matches) return;

		const NAV = 80; // doit correspondre à scroll-margin-top des sections
		const EDGE = 6; // tolérance en px pour détecter les bords
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
			lockTimer = setTimeout(() => (locked = false), reduce ? 80 : 700);
		};

		const attemptJump = (dir: 1 | -1, e?: Event) => {
			const idx = currentIndex();
			const sec = sections[idx];
			const tooTall = sec.offsetHeight > window.innerHeight - NAV;

			if (tooTall) {
				const atTop = window.scrollY <= sec.offsetTop - NAV + EDGE;
				const atBottom = window.scrollY + window.innerHeight >= sec.offsetTop + sec.offsetHeight - EDGE;
				// Au milieu d'une section trop haute : défilement natif libre.
				if (dir > 0 && !atBottom) return;
				if (dir < 0 && !atTop) return;
			}

			e?.preventDefault();
			if (locked) return;
			goTo(idx + dir);
		};

		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // scroll horizontal ignoré
			if (Math.abs(e.deltaY) < 2) return;
			attemptJump(e.deltaY > 0 ? 1 : -1, e);
		};

		const onKey = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement)?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA') return;
			if (e.key === 'ArrowDown' || e.key === 'PageDown') attemptJump(1, e);
			else if (e.key === 'ArrowUp' || e.key === 'PageUp') attemptJump(-1, e);
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);

		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			clearTimeout(lockTimer);
		};
	}, [selector]);
}
