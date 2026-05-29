import type { Skill } from './models/skill';
import type { Project } from './models/project';

/**
 * Données fictives utilisées en repli lorsque l'API ne répond pas,
 * afin de visualiser le rendu de l'interface. Les chemins pointent vers
 * les assets déjà présents dans `public/`.
 */
export const fallbackSkills: Skill[] = [
	{ id: 1, name: 'React', description: 'Interfaces composées et réactives.', image_path: '/logos/React_logo.svg' },
	{ id: 2, name: 'TypeScript', description: 'JavaScript typé pour un code plus sûr.', image_path: '/logos/TypeScript_logo.svg' },
	{ id: 3, name: 'JavaScript', description: 'Le langage du web, du client au serveur.', image_path: '/logos/JavaScript_logo.svg' },
	{ id: 4, name: 'Vue.js', description: 'Framework progressif pour le front.', image_path: '/logos/VueJS_logo.svg' },
	{ id: 5, name: 'HTML5', description: 'Structure sémantique et accessible.', image_path: '/logos/HTML5_logo.svg' },
	{ id: 6, name: 'Sass', description: 'CSS étendu : variables, mixins, nesting.', image_path: '/logos/Scss_logo.svg' },
	{ id: 7, name: 'Node.js', description: 'JavaScript côté serveur et outillage.', image_path: '/logos/NodeJS_logo.svg' },
	{ id: 8, name: 'Vite', description: 'Build ultra-rapide et HMR instantané.', image_path: '/logos/Vite_Dev_logo.svg' },
	{ id: 9, name: 'SQLite', description: 'Base de données légère et embarquée.', image_path: '/logos/sqlite_icon.svg' },
	{ id: 10, name: 'NoSQL', description: 'Bases orientées documents (MongoDB…).', image_path: '/logos/NoSQL.svg' },
];

const skill = (name: string): Skill => fallbackSkills.find((s) => s.name === name)!;

export const fallbackProjects: Project[] = [
	{
		id: 1,
		title: 'Portfolio React',
		description:
			"Ce portfolio : interface dark éditoriale, animations au scroll et données chargées depuis une API maison.",
		github: 'https://github.com/Maddax10/portfolio-react',
		image_path: '/images/portfolio.png',
		skills: [skill('React'), skill('TypeScript'), skill('Sass'), skill('Vite')],
	},
	{
		id: 2,
		title: 'Portfolio API',
		description:
			"L'API qui alimente le portfolio : endpoints skills & projets, servis depuis une base SQLite.",
		github: 'https://github.com/Maddax10/portfolio-api',
		image_path: '/images/portfolio-api.png',
		skills: [skill('Node.js'), skill('TypeScript'), skill('SQLite')],
	},
	{
		id: 3,
		title: 'Urbex Chronicles',
		description:
			"Projet d'exploration : galerie immersive et navigation fluide pour raconter des lieux abandonnés.",
		github: 'https://github.com/Maddax10?tab=repositories',
		image_path: '/images/urbex-chronicles.png',
		skills: [skill('Vue.js'), skill('JavaScript'), skill('Sass')],
	},
];
