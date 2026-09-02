import assert from 'node:assert/strict';
import { compareRepos, shouldShowRepo, type GitHubRepo } from '../scripts/generate-projects';
import { featuredRepoOrder, projectOverrides } from '../src/lib/project-config';

function repo(overrides: Partial<GitHubRepo>): GitHubRepo {
	return {
		name: 'example',
		html_url: 'https://github.com/ata-sesli/example',
		description: 'Example project',
		homepage: null,
		language: 'TypeScript',
		topics: [],
		fork: false,
		archived: false,
		disabled: false,
		private: false,
		updated_at: '2026-01-01T00:00:00Z',
		...overrides
	};
}

assert.equal(
	shouldShowRepo(repo({ topics: ['portfolio', 'tooling'] })),
	true,
	'a repository with the portfolio topic should be discovered'
);
assert.equal(
	shouldShowRepo(repo({ topics: ['tooling'] })),
	false,
	'an ordinary public repository should not appear automatically'
);
assert.equal(
	shouldShowRepo(repo({ name: 'zova', description: null })),
	true,
	'a repository in featuredRepoOrder should be explicitly included'
);

const ordered = [
	repo({ name: 'new-project', topics: ['portfolio'], updated_at: '2026-08-01T00:00:00Z' }),
	repo({ name: 'rchat', updated_at: '2025-01-01T00:00:00Z' }),
	repo({ name: 'zova', updated_at: '2024-01-01T00:00:00Z' }),
	repo({ name: 'older-project', topics: ['portfolio'], updated_at: '2026-07-01T00:00:00Z' })
].sort(compareRepos);

assert.deepEqual(
	ordered.map(({ name }) => name),
	['zova', 'rchat', 'new-project', 'older-project'],
	'featured repositories should use the override order before recently updated projects'
);

for (const repoName of featuredRepoOrder) {
	const override = projectOverrides[repoName];

	assert.ok(override?.description?.trim(), `${repoName} should have a curated description`);
	assert.ok(override?.tags?.trim(), `${repoName} should have curated tags`);
}

console.log('Project discovery and ordering are valid.');
