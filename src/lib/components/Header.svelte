<script lang="ts">
	import { BookOpenText, Github, Linkedin, Mail } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let isScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header class:scrolled={isScrolled}>
	<div class="header-inner container">
		<a href="/" class="logo text-gradient">Ata Sesli</a>

		<div class="header-actions">
			<nav>
				<a href="#projects" class="nav-link">Work</a>
				<a href="#about" class="nav-link">How I Build</a>
			</nav>

			<div class="social-links" aria-label="Social links">
				<a
					href="https://github.com/ata-sesli"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
				>
					<Github size={18} />
				</a>
				<a
					href="https://www.linkedin.com/in/ata-sesli/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
				>
					<Linkedin size={18} />
				</a>
				<a
					href="https://medium.com/@atasesli05"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Medium"
				>
					<BookOpenText size={18} />
				</a>
				<a href="mailto:atasesli@protonmail.com" aria-label="Email">
					<Mail size={18} />
				</a>
			</div>
		</div>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		transition:
			background 0.3s ease,
			padding 0.3s ease,
			border-color 0.3s ease;
		padding: var(--spacing-md) 0;
		border-bottom: 1px solid transparent;
	}

	header.scrolled {
		background: rgba(10, 10, 12, 0.8);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--clr-glass-border);
		padding: var(--spacing-sm) 0;
	}

	.header-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-md);
	}

	.logo {
		font-family: 'Outfit', sans-serif;
		font-weight: 700;
		font-size: 1.5rem;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	nav {
		display: flex;
		gap: var(--spacing-lg);
	}

	.nav-link {
		font-weight: 500;
		opacity: 0.8;
	}

	.nav-link:hover {
		opacity: 1;
		color: var(--clr-primary);
	}

	.social-links {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.social-links a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		color: var(--clr-text-muted);
		border: 1px solid transparent;
		border-radius: 50%;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;
	}

	.social-links a:hover {
		color: var(--clr-text-main);
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--clr-glass-border);
		transform: translateY(-1px);
	}

	@media (max-width: 640px) {
		nav {
			display: none;
		}

		.header-actions {
			gap: var(--spacing-md);
		}

		.social-links {
			gap: 0.35rem;
		}

		.social-links a {
			width: 1.8rem;
			height: 1.8rem;
		}
	}
</style>
