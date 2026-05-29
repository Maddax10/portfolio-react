import { useEffect } from 'react';

/**
 * Snap « franc » entre sections, piloté en JS.
 *
 * - Desktop : un cran de molette / une flèche saute à la section voisine.
 * - Mobile : un léger swipe du doigt saute à la section voisine (on neutralise
 *   l'inertie tactile native pour que ce soit net).
 *
 * Sections plus hautes que l'écran : défilement libre à l'intérieur. Après
 * chaque défilement, un « settle » recale sur le bloc qui occupe le MILIEU de
 * l'écran (règle des 50 %), pour ne jamais rester coincé entre deux blocs.
 */
export function useSectionSnap(selector = '.intro, .section, .footer') {
	useEffect(() => {
		const NAV = 0; // sections en min-height:100dvh, alignées plein écran
		const EDGE = 6; // tolérance px pour détecter les bords
		const SWIPE = 24; // distance px mini d'un swipe pour déclencher
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
		if (sections.length === 0) return;

		let locked = false;
		let touching = false;
		let lockTimer: ReturnType<typeof setTimeout>;
		let settleTimer: ReturnType<typeof setTimeout>;

		const lock = () => {
			locked = true;
			clearTimeout(lockTimer);
			lockTimer = setTimeout(() => (locked = false), reduce ? 80 : 200);
		};

		const scrollToPos = (top: number) => {
			lock();
			window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
		};

		const currentIndex = () => {
			let idx = 0;
			sections.forEach((s, i) => {
				if (s.offsetTop - NAV <= window.scrollY + EDGE) idx = i;
			});
			return idx;
		};

		const goTo = (i: number) => {
			const target = sections[i];
			if (target) scrollToPos(target.offsetTop - NAV);
		};

		// Saut autorisé dans cette direction ? (faux = défilement natif libre
		// dans une section plus haute que l'écran)
		const canJump = (dir: 1 | -1) => {
			const sec = sections[currentIndex()];
			if (sec.offsetHeight <= window.innerHeight + EDGE) return true;
			const atTop = window.scrollY <= sec.offsetTop - NAV + EDGE;
			const atBottom = window.scrollY + window.innerHeight >= sec.offsetTop + sec.offsetHeight - EDGE;
			return dir > 0 ? atBottom : atTop;
		};

		const jump = (dir: 1 | -1) => goTo(currentIndex() + dir);

		// Recale sur le bloc qui occupe le milieu de l'écran.
		const settle = () => {
			if (locked || touching) return;
			const vh = window.innerHeight;
			const mid = window.scrollY + vh / 2;

			let idx = 0;
			sections.forEach((s, i) => {
				if (s.offsetTop <= mid) idx = i;
			});
			const sec = sections[idx];
			const alignedTop = Math.max(0, sec.offsetTop - NAV);

			let dest: number;
			if (sec.offsetHeight <= vh + EDGE) {
				dest = alignedTop; // section qui tient : alignée en haut
			} else {
				// section trop haute : on borne dans sa plage lisible
				const alignedBottom = sec.offsetTop + sec.offsetHeight - vh;
				dest = Math.min(Math.max(window.scrollY, alignedTop), alignedBottom);
			}

			if (Math.abs(dest - window.scrollY) > EDGE) scrollToPos(dest);
		};

		const onScroll = () => {
			clearTimeout(settleTimer);
			settleTimer = setTimeout(settle, 140);
		};

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
			touching = true;
			startY = lastY = e.touches[0].clientY;
			hijackDir = 0;
		};

		const onTouchMove = (e: TouchEvent) => {
			const y = e.touches[0].clientY;
			lastY = y;
			const dir: 1 | -1 = startY - y > 0 ? 1 : -1; // swipe vers le haut = section suivante
			if (locked) {
				e.preventDefault();
				return;
			}
			if (canJump(dir)) {
				hijackDir = dir;
				e.preventDefault();
			} else {
				hijackDir = 0;
			}
		};

		const onTouchEnd = () => {
			touching = false;
			if (!locked && hijackDir && Math.abs(startY - lastY) >= SWIPE) jump(hijackDir);
			hijackDir = 0;
			onScroll(); // déclenche un settle après l'inertie éventuelle
		};

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('touchend', onTouchEnd);
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
			window.removeEventListener('scroll', onScroll);
			clearTimeout(lockTimer);
			clearTimeout(settleTimer);
		};
	}, [selector]);
}
