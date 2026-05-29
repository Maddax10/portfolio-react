import { create } from 'zustand';
import { API_BASE_POINT, API_PORT, API_URL } from '../config/config';
import type { Project } from './models/project.ts';
import { fallbackProjects } from './fallbackData.ts';

type ProjectsState = {
	projects: Project[];
	loading: boolean;
	error: string | null;
	fallback: boolean;
	fetchProjects: () => Promise<void>;
	clear: () => void;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
	projects: [],
	loading: false,
	error: null,
	fallback: false,

	fetchProjects: async () => {
		set({ loading: true, error: null });
		try {
			const resp = await fetch(`${API_URL}:${API_PORT}/${API_BASE_POINT}/projects/all`);
			if (!resp.ok) {
				set({ projects: fallbackProjects, fallback: true, error: null });
				return;
			}
			const data: Project[] = await resp.json();
			set({ projects: data, fallback: false, error: null });
		} catch {
			// API injoignable : on bascule sur les données fictives.
			set({ projects: fallbackProjects, fallback: true, error: null });
		} finally {
			set({ loading: false });
		}
	},

	clear: () => set({ projects: [], error: null, fallback: false }),
}));
