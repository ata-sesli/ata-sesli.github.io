<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown } from 'lucide-svelte';

	export let fullName: string;
	export let title: string;
	export let subtitle: string;

	let displayText = '';
	let isCursorVisible = true;

	// Typing animation logic
	onMount(() => {
		let i = 0;
		const typeWriter = setInterval(() => {
			if (i < title.length) {
				displayText += title.charAt(i);
				i++;
			} else {
				clearInterval(typeWriter);
			}
		}, 50);

		const cursorBlink = setInterval(() => {
			isCursorVisible = !isCursorVisible;
		}, 530);

		return () => {
			clearInterval(typeWriter);
			clearInterval(cursorBlink);
		};
	});
</script>

<div class="hero-container">
	<div class="hero-content">
		<span class="greeting">Hi, I'm</span>
		<h1 class="name">{fullName}</h1>
		<h2 class="title text-gradient">
			{displayText}<span class="cursor" class:visible={isCursorVisible}>|</span>
		</h2>
		<p class="subtitle">{subtitle}</p>
	</div>

	<a href="#projects" class="scroll-down" aria-label="Scroll down">
		<span class="scroll-text">Scroll Down</span>
		<ChevronDown size={24} />
	</a>
</div>

<style>
	.hero-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		text-align: center;
		overflow: hidden;
	}

	/* Background accent glow */
	.hero-container::before {
		content: '';
		position: absolute;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(10, 10, 12, 0) 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.greeting {
		font-size: 1.25rem;
		color: var(--clr-accent);
		margin-bottom: var(--spacing-sm);
		display: block;
		opacity: 0;
		animation: fadeIn 1s ease forwards 0.2s;
	}

	.name {
		font-size: 4rem;
		font-weight: 900;
		margin-bottom: var(--spacing-sm);
		letter-spacing: -0.05em;
		opacity: 0;
		animation: fadeIn 1s ease forwards 0.5s;
	}

	.title {
		font-size: 2rem;
		font-weight: 600;
		min-height: 1.2em;
	}

	.subtitle {
		max-width: 680px;
		margin: var(--spacing-md) auto 0;
		font-size: 1.05rem;
		color: var(--clr-text-muted);
		opacity: 0;
		animation: fadeIn 1s ease forwards 1s;
	}

	.cursor {
		color: var(--clr-primary);
		opacity: 0;
		margin-left: 2px;
	}

	.cursor.visible {
		opacity: 1;
	}

	.scroll-down {
		position: absolute;
		bottom: var(--spacing-xl);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		opacity: 0.5;
		animation: bounce 2s infinite;
		transition: opacity 0.3s;
	}

	.scroll-down:hover {
		opacity: 1;
		color: var(--clr-primary);
	}

	.scroll-text {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	@media (max-width: 768px) {
		.name {
			font-size: 3rem;
		}
		.title {
			font-size: 1.5rem;
		}
		.subtitle {
			max-width: 320px;
			font-size: 0.95rem;
		}
	}
</style>
