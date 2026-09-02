import { writeFile } from 'node:fs/promises';
import { featuredRepoOrder, hiddenRepos, projectOverrides } from '../src/lib/project-config';

export type GitHubRepo = {
	name: string;
	html_url: string;
	description: string | null;
	homepage: string | null;
	language: string | null;
	topics: string[];
	fork: boolean;
	archived: boolean;
	disabled: boolean;
	private: boolean;
	updated_at: string;
};

type ProjectLink = {
	label: 'GitHub' | 'Website' | 'Demo' | 'Docs' | 'Release';
	url: string;
};

type Project = {
	name: string;
	kicker: string;
	description: string;
	tags: string;
	links: ProjectLink[];
};

const GITHUB_USER = 'ata-sesli';
const OUTPUT_PATH = 'src/lib/generated-projects.ts';

const hiddenRepoSet = new Set(hiddenRepos);
const featuredIndex = new Map(featuredRepoOrder.map((name, index) => [name, index]));

if (import.meta.main) {
	const repos = await fetchRepos();
	const projects = repos.filter(shouldShowRepo).sort(compareRepos).map(repoToProject);

	await writeFile(
		OUTPUT_PATH,
		`import type { Project } from './projects';\n\nconst projects: Project[] = ${JSON.stringify(projects, null, 2)};\n\nexport default projects;\n`
	);

	console.log(`Generated ${projects.length} projects in ${OUTPUT_PATH}`);
	console.log(projects.map((project) => `- ${project.name}`).join('\n'));
}

async function fetchRepos(): Promise<GitHubRepo[]> {
	const response = await fetch(
		`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'ata-sesli-portfolio-project-generator'
			}
		}
	);

	if (!response.ok) {
		throw new Error(`GitHub repo fetch failed: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as GitHubRepo[];
}

export function shouldShowRepo(repo: GitHubRepo): boolean {
	if (repo.private || repo.fork || repo.archived || repo.disabled || hiddenRepoSet.has(repo.name)) {
		return false;
	}

	if (featuredIndex.has(repo.name)) {
		return true;
	}

	return Boolean(repo.description && repo.topics.includes('portfolio'));
}

export function compareRepos(a: GitHubRepo, b: GitHubRepo): number {
	const aFeatured = featuredIndex.get(a.name);
	const bFeatured = featuredIndex.get(b.name);

	if (aFeatured !== undefined && bFeatured !== undefined) {
		return aFeatured - bFeatured;
	}

	if (aFeatured !== undefined) {
		return -1;
	}

	if (bFeatured !== undefined) {
		return 1;
	}

	return Date.parse(b.updated_at) - Date.parse(a.updated_at);
}

function repoToProject(repo: GitHubRepo): Project {
	const override = projectOverrides[repo.name] ?? {};
	const website = override.website ?? normalizedHomepage(repo.homepage);
	const links: ProjectLink[] = [{ label: 'GitHub', url: repo.html_url }];

	if (website) {
		links.push({ label: 'Website', url: website });
	}

	return {
		name: override.name ?? titleCaseRepoName(repo.name),
		kicker: override.kicker ?? kickerFromRepo(repo),
		description: override.description ?? repo.description ?? 'Public GitHub project.',
		tags: override.tags ?? tagsFromRepo(repo),
		links
	};
}

function normalizedHomepage(homepage: string | null): string {
	const trimmed = homepage?.trim();
	return trimmed && /^https?:\/\//.test(trimmed) ? trimmed : '';
}

function kickerFromRepo(repo: GitHubRepo): string {
	const firstTopic = repo.topics[0]?.replaceAll('-', ' ');

	if (firstTopic) {
		return titleCase(firstTopic);
	}

	return repo.language ? `${repo.language} Project` : 'Project';
}

function tagsFromRepo(repo: GitHubRepo): string {
	const tags = [repo.language, ...repo.topics]
		.filter((tag): tag is string => Boolean(tag))
		.map(formatTag);

	return [...new Set(tags)].slice(0, 5).join(', ');
}

function formatTag(tag: string): string {
	const knownTags: Record<string, string> = {
		cli: 'CLI',
		ffi: 'FFI',
		p2p: 'P2P',
		rss: 'RSS',
		sqlite: 'SQLite',
		tui: 'TUI'
	};

	return knownTags[tag.toLowerCase()] ?? titleCase(tag.replaceAll('-', ' '));
}

function titleCaseRepoName(name: string): string {
	return titleCase(name.replaceAll('-', ' '));
}

function titleCase(value: string): string {
	return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
