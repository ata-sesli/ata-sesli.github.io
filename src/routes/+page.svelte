<script lang="ts">
	import { marked } from 'marked';
	import projects from '$lib/projects';
	import aboutMe from '$lib/about-me';
	// @ts-ignore
	import descriptionRaw from '$lib/description.md?raw';

	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBot from '$lib/components/ChatBot.svelte';

	const descriptionHtml = marked.parse(descriptionRaw);
</script>

<Header />

<main>
	<Hero fullName={aboutMe['full-name']} title={aboutMe.title} />

	<div id="projects" class="section-wrapper">
		<div class="container">
			<Section>
				<div class="section-header">
					<h2 class="section-title">Featured Projects</h2>
					<div class="title-line"></div>
				</div>

				<div class="projects-grid">
					{#each projects as project}
						<div class="grid-item">
							<ProjectCard {project} />
						</div>
					{/each}
				</div>
			</Section>
		</div>
	</div>

	<div id="about" class="section-wrapper">
		<div class="container">
			<Section>
				<div class="section-header">
					<h2 class="section-title">About Me</h2>
					<div class="title-line"></div>
				</div>

				<div class="about-content glass-panel">
					<div class="markdown-body">
						{@html descriptionHtml}
					</div>
				</div>
			</Section>
		</div>
	</div>
</main>

<Footer />
<ChatBot />

<style>
	.section-wrapper {
		padding: var(--spacing-xl) 0;
	}

	.section-header {
		margin-bottom: var(--spacing-xl);
		position: relative;
		display: inline-block;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: var(--spacing-sm);
		background: linear-gradient(to right, #fff, var(--clr-text-muted));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.title-line {
		height: 4px;
		width: 60px;
		background: var(--clr-primary);
		border-radius: 2px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-lg);
	}

	.about-content {
		padding: var(--spacing-xl);
		background: rgba(255, 255, 255, 0.02);
	}

	/* Markdown Styles specifically for the about section */
	.markdown-body :global(p) {
		margin-bottom: var(--spacing-md);
		font-size: 1.1rem;
		leading-trim: both;
		text-edge: cap;
	}

	.markdown-body :global(strong) {
		color: var(--clr-text-main);
		font-weight: 600;
	}

	.markdown-body :global(a) {
		color: var(--clr-accent);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 4px;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.section-title {
			font-size: 2rem;
		}

		.about-content {
			padding: var(--spacing-lg);
		}
	}
</style>
