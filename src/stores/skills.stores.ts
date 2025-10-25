import { create } from 'zustand';
import { API_PORT, API_URL } from '../config/config';
import type { Skill } from './models/skill.ts';

type skillsState = {
	skills: Skill[];
	loading: boolean;
	error: string | null;
	fetchSkills: () => Promise<void>;
	clear: () => void;
};

export const useSkillsStore = create<skillsState>((set) => ({
	skills: [],
	loading: false,
	error: null,

	fetchSkills: async () => {
		set({ loading: true, error: null });
		try {
			const resp = await fetch(`${API_URL}:${API_PORT}/api/skills/all`);
			if (!resp.ok) {
				set({ error: 'réponse invalide' });
				return;
			}
			const data: Skill[] = await resp.json();
			set({ skills: data, error: null });
		} catch {
			set({ error: 'Erreur de chargement des skills' });
		} finally {
			set({ loading: false });
		}
	},

	clear: () => set({ skills: [], error: null }),
}));
