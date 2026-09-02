<script lang="ts">
	import { marked } from 'marked';
	import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-svelte';

	type Message = {
		role: 'assistant' | 'user';
		text: string;
	};

	const starterPrompts = [
		'Which projects use Rust?',
		'Tell me about RChat',
		'What kind of engineer is Ata?',
		'Show security-related projects'
	];
	const workerEndpoint = 'https://too-far-gone.rappeland2005.workers.dev';

	let isOpen = false;
	let input = '';
	let isLoading = false;
	let messages: Message[] = [
		{
			role: 'assistant',
			text: "Ask me about Ata's projects, GitHub repos, technical background, or project websites."
		}
	];

	async function sendMessage(text = input) {
		const message = text.trim();

		if (!message || isLoading) {
			return;
		}

		messages = [...messages, { role: 'user', text: message }];
		input = '';
		isLoading = true;

		try {
			const response = await fetch(workerEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message })
			});
			const data = await response.json();
			const reply = data.reply ?? data.error;

			messages = [
				...messages,
				{
					role: 'assistant',
					text: typeof reply === 'string' ? reply : 'The chatbot is temporarily unavailable.'
				}
			];
		} catch {
			messages = [
				...messages,
				{
					role: 'assistant',
					text: 'The chatbot is temporarily unavailable.'
				}
			];
		} finally {
			isLoading = false;
		}
	}

	function renderAssistantMessage(text: string) {
		return marked.parse(normalizeAssistantMessage(text), { async: false });
	}

	function normalizeAssistantMessage(text: string) {
		return (text || '')
			.replace(/\s*\[\d+(?:\.\d+)*(?:,\s*\d+(?:\.\d+)*)*\]/g, '')
			.replace(/:\s+\*\s+/g, ':\n\n* ')
			.replace(/\s+\*\s+(?=(?:\*\*)?[A-Z0-9])/g, '\n* ');
	}
</script>

<div class="chatbot" class:open={isOpen}>
	{#if isOpen}
		<section class="chat-panel glass-panel" aria-label="Ata AI chat">
			<header class="chat-header">
				<div class="chat-title">
					<span class="bot-mark">
						<Bot size={18} />
					</span>
					<div>
						<h2>Ask Ata's AI</h2>
						<p>Projects, repos, background</p>
					</div>
				</div>

				<button
					class="icon-button"
					type="button"
					aria-label="Close chat"
					on:click={() => (isOpen = false)}
				>
					<X size={18} />
				</button>
			</header>

			<div class="messages" aria-live="polite">
				{#each messages as message}
					<div class="message" class:user={message.role === 'user'}>
						{#if message.role === 'assistant'}
							<div class="message-body markdown">{@html renderAssistantMessage(message.text)}</div>
						{:else}
							<p>{message.text}</p>
						{/if}
					</div>
				{/each}

				{#if isLoading}
					<div class="message loading">
						<span class="spinner">
							<LoaderCircle size={16} />
						</span>
						<p>Thinking</p>
					</div>
				{/if}
			</div>

			<div class="starters" aria-label="Suggested questions">
				{#each starterPrompts as prompt}
					<button type="button" on:click={() => sendMessage(prompt)}>{prompt}</button>
				{/each}
			</div>

			<form class="composer" on:submit|preventDefault={() => sendMessage()}>
				<input
					bind:value={input}
					placeholder="Ask about Ata or a project..."
					aria-label="Chat message"
				/>
				<button type="submit" aria-label="Send message" disabled={!input.trim() || isLoading}>
					<Send size={18} />
				</button>
			</form>
		</section>
	{/if}

	<button
		class="launcher"
		type="button"
		aria-label={isOpen ? 'Close chat' : "Open Ata's AI chat"}
		aria-expanded={isOpen}
		on:click={() => (isOpen = !isOpen)}
	>
		{#if isOpen}
			<X size={22} />
		{:else}
			<MessageCircle size={22} />
			<span>Ask Ata's AI</span>
		{/if}
	</button>
</div>

<style>
	.chatbot {
		position: fixed;
		right: 24px;
		bottom: 24px;
		z-index: 200;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-md);
	}

	.chat-panel {
		width: min(380px, calc(100vw - 32px));
		height: min(520px, calc(100vh - 128px));
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
		animation: panelIn 0.28s var(--ease-out-expo);
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--clr-glass-border);
		background: rgba(5, 5, 5, 0.72);
	}

	.chat-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		min-width: 0;
	}

	.bot-mark,
	.launcher,
	.composer button {
		background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
		color: #fff;
	}

	.bot-mark {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		box-shadow: 0 0 24px rgba(249, 115, 22, 0.24);
	}

	.chat-title h2 {
		font-size: 1rem;
		margin-bottom: 0.15rem;
	}

	.chat-title p {
		margin: 0;
		font-size: 0.78rem;
		line-height: 1.2;
	}

	button {
		font: inherit;
	}

	.icon-button,
	.launcher,
	.starters button,
	.composer button {
		border: 0;
		cursor: pointer;
	}

	.icon-button {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.06);
		color: var(--clr-text-main);
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.icon-button:hover {
		background: rgba(239, 68, 68, 0.16);
		color: var(--clr-primary-glow);
	}

	.messages {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		overflow-y: auto;
	}

	.message {
		max-width: 88%;
		align-self: flex-start;
		padding: 0.75rem 0.85rem;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.message.user {
		align-self: flex-end;
		background: rgba(220, 38, 38, 0.2);
		border-color: rgba(239, 68, 68, 0.22);
	}

	.message.loading {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.spinner {
		display: inline-flex;
		animation: spin 0.8s linear infinite;
	}

	.message p,
	.message-body :global(p) {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--clr-text-main);
	}

	.message-body :global(p + p),
	.message-body :global(ul) {
		margin-top: var(--spacing-sm);
	}

	.message-body :global(ul) {
		margin-bottom: 0;
		padding-left: 1.15rem;
	}

	.message-body :global(li) {
		margin: 0.35rem 0;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--clr-text-main);
	}

	.message-body :global(strong) {
		color: #fff;
		font-weight: 700;
	}

	.message-body :global(a) {
		color: var(--clr-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.starters {
		display: flex;
		gap: var(--spacing-sm);
		padding: 0 var(--spacing-md) var(--spacing-md);
		overflow-x: auto;
	}

	.starters button {
		flex: 0 0 auto;
		padding: 0.45rem 0.7rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--clr-glass-border);
		color: var(--clr-text-muted);
		font-size: 0.78rem;
		transition:
			border-color 0.2s ease,
			color 0.2s ease,
			background 0.2s ease;
	}

	.starters button:hover {
		background: rgba(239, 68, 68, 0.12);
		border-color: rgba(239, 68, 68, 0.35);
		color: var(--clr-text-main);
	}

	.composer {
		display: flex;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		border-top: 1px solid var(--clr-glass-border);
		background: rgba(5, 5, 5, 0.72);
	}

	.composer input {
		min-width: 0;
		flex: 1;
		height: 44px;
		box-sizing: border-box;
		border: 1px solid var(--clr-glass-border);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		color: var(--clr-text-main);
		padding: 0 0.95rem;
		outline: none;
		font: inherit;
	}

	.composer input:focus {
		border-color: rgba(249, 115, 22, 0.55);
		box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
	}

	.composer button {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
	}

	.composer button:disabled {
		cursor: not-allowed;
		filter: grayscale(0.7);
		opacity: 0.45;
	}

	.launcher {
		min-height: 56px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		border-radius: 999px;
		padding: 0 1.1rem;
		font-weight: 700;
		box-shadow: 0 16px 48px rgba(220, 38, 38, 0.32);
		transition:
			transform 0.2s var(--ease-out-expo),
			box-shadow 0.2s ease;
		animation: launcherIn 0.5s var(--ease-out-expo) 0.8s both;
	}

	.launcher:hover {
		transform: translateY(-2px);
		box-shadow: 0 20px 60px rgba(249, 115, 22, 0.34);
	}

	.open .launcher {
		width: 56px;
		padding: 0;
	}

	.open .launcher span {
		display: none;
	}

	@keyframes panelIn {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes launcherIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 640px) {
		.chatbot {
			right: 16px;
			bottom: 16px;
		}

		.chat-panel {
			width: calc(100vw - 32px);
			height: min(620px, calc(100vh - 112px));
		}

		.launcher {
			width: 56px;
			padding: 0;
		}

		.launcher span {
			display: none;
		}
	}
</style>
