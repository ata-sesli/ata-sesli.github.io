<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';
	import type { Project } from '$lib/projects';

	export let project: Project;

	$: tagsArray = project.tags.split(',').map((tag) => tag.trim());
</script>

<article class="project-card">
	<div class="project-card-content">
		<div class="project-heading">
			<h3 class="project-title">{project.name}</h3>
		</div>

		<p class="project-description">{project.description}</p>

		<div class="project-tags">
			{#each tagsArray as tag}
				<span>{tag}</span>
			{/each}
		</div>

		<div class="project-card-links">
			{#each project.links as link}
				<a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
					{#if link.label === 'GitHub'}
						<Github size={15} />
					{:else}
						<ExternalLink size={15} />
					{/if}
					<span>{link.label}</span>
				</a>
			{/each}
		</div>
	</div>
</article>

<style>
	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 260px;
		height: auto;
		padding: 28px;
		border-radius: 22px;
		border: 1px solid rgba(255, 95, 64, 0.18);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012));
		overflow: hidden;
		transition:
			transform 0.22s ease,
			border-color 0.22s ease,
			background 0.22s ease,
			box-shadow 0.22s ease;
	}

	.project-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 28px;
		right: 28px;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 95, 64, 0.42), transparent);
		opacity: 0.55;
		pointer-events: none;
	}

	.project-card:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 95, 64, 0.42);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
		box-shadow: 0 14px 30px -24px rgba(255, 95, 64, 0.45);
	}

	.project-card-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 16px;
		min-width: 0;
	}

	.project-heading {
		display: flex;
		flex-direction: column;
	}

	.project-title {
		margin: 0;
		color: var(--clr-text-main);
		font-size: clamp(1.35rem, 1.2rem + 0.35vw, 1.65rem);
		font-weight: 750;
		letter-spacing: -0.03em;
		line-height: 1.08;
	}

	.project-description {
		max-width: 58ch;
		margin: 0;
		color: var(--clr-text-muted);
		font-size: 0.98rem;
		line-height: 1.62;
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.project-tags span {
		display: inline-flex;
		align-items: center;
		min-height: 27px;
		padding: 0.25rem 0.68rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.045);
		color: rgba(255, 255, 255, 0.66);
		font-size: 0.74rem;
		font-weight: 500;
		line-height: 1;
	}

	.project-card-links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: auto;
		padding-top: 4px;
	}

	.project-card-links a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.42rem;
		min-height: 34px;
		padding: 0.45rem 0.78rem;
		border: 1px solid rgba(255, 95, 64, 0.2);
		border-radius: 999px;
		background: rgba(255, 95, 64, 0.055);
		color: rgba(255, 238, 232, 0.82);
		font-size: 0.8rem;
		font-weight: 650;
		line-height: 1;
		transition:
			transform 0.18s ease,
			background 0.18s ease,
			border-color 0.18s ease,
			color 0.18s ease;
	}

	.project-card-links a:hover {
		transform: translateY(-1px);
		border-color: rgba(255, 95, 64, 0.48);
		background: rgba(255, 95, 64, 0.16);
		color: #fff;
	}

	@media (max-width: 760px) {
		.project-card {
			min-height: 0;
			padding: 24px;
		}
	}
</style>
