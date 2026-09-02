import generatedProjects from './generated-projects';

export type Project = {
	name: string;
	kicker: string;
	description: string;
	tags: string;
	links: ProjectLink[];
};

export type ProjectLink = {
	label: 'GitHub' | 'Website' | 'Demo' | 'Docs' | 'Release';
	url: string;
};

export default generatedProjects;
