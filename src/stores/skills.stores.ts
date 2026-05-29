import { create } from 'zustand';
import { API_BASE_POINT, API_PORT, API_URL } from '../config/config';
import type { Skill } from './models/skill.ts';
import { fallbackSkills } from './fallbackData.ts';

type skillsState = {
	skills: Skill[];
	loading: boolean;
	error: string | null;
	fallback: boolean;
	fetchSkills: () => Promise<void>;
	clear: () => void;
};

export const useSkillsStore = create<skillsState>((set) => ({
	skills: [],
	loading: false,
	error: null,
	fallback: false,

	fetchSkills: async () => {
		set({ loading: true, error: null });
		try {
			const resp = await fetch(`${API_URL}:${API_PORT}/${API_BASE_POINT}/skills/all`);
			if (!resp.ok) {
				set({ skills: fallbackSkills, fallback: true, error: null });
				return;
			}
			const data: Skill[] = await resp.json();
			set({ skills: data, fallback: false, error: null });
		} catch {
			// API injoignable : on bascule sur les données fictives.
			set({ skills: fallbackSkills, fallback: true, error: null });
		} finally {
			set({ loading: false });
		}
	},

	clear: () => set({ skills: [], error: null, fallback: false }),
}));
