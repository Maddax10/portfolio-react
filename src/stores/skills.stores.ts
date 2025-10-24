import { create } from 'zustand';
import { API_PORT, API_URL } from '../config/config';
import type { Skill } from './models/skill.ts';

type skillsState = {
  projects: Skill[];
  loading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  clear: () => void;
};

export const useSkillsStore = create<skillsState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchSkills: async () => {
    set({ loading: true, error: null });
    try {
      // Simule une API
      const resp = await fetch(`${API_URL}:${API_PORT}/skills/all`);
      console.log('skills : ', await resp.json());

      if (!resp.ok) {
        set({ error: 'réponse invalide' });
        return;
      }
    } catch {
      set({ error: 'Erreur de chargement store' });
    } finally {
      set({ loading: false });
    }
  },

  clear: () => set({ projects: [], error: null }),
}));
