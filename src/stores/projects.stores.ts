import { create } from 'zustand';
import { API_BASE_POINT, API_PORT, API_URL } from '../config/config';
import type { Project } from './models/project.ts';

type ProjectsState = {
	projects: Project[];
	loading: boolean;
	error: string | null;
	fetchProjects: () => Promise<void>;
	clear: () => void;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
	projects: [],
	loading: false,
	error: null,

	fetchProjects: async () => {
		set({ loading: true, error: null });
		try {
			const resp = await fetch(`${API_URL}:${API_PORT}/${API_BASE_POINT}/projects/all`);
			if (!resp.ok) {
				set({ error: 'réponse invalide' });
				return;
			}
			const data: Project[] = await resp.json();
			set({ projects: data, error: null });
		} catch {
			set({ error: 'Erreur de chargement store' });
		} finally {
			set({ loading: false });
		}
	},

	clear: () => set({ projects: [], error: null }),
}));
