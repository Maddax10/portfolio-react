import type { Skill } from './skill';

export type Project = {
	id: number;
	title: string;
	description: string;
	github: string;
	image_path: string;
	skills: Array<Skill>;
};
