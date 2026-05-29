import { useEffect, useState } from 'react';

/**
 * Renvoie l'id de la section actuellement visible parmi `ids`, pour
 * mettre en surbrillance le lien de navigation correspondant.
 */
export function useScrollSpy(ids: string[], offset = 0): string {
	const [active, setActive] = useState<string>(ids[0] ?? '');

	useEffect(() => {
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: `-${offset + 20}% 0px -55% 0px`, threshold: [0.1, 0.5, 0.9] }
		);

		sections.forEach((s) => io.observe(s));
		return () => io.disconnect();
	}, [ids, offset]);

	return active;
}
