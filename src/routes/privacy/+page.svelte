<svelte:head>
	<title>Privacy | Ata Sesli</title>
	<meta
		name="description"
		content="How this portfolio and its optional AI chat handle information, and how to contact Ata Sesli."
	/>
	<link rel="canonical" href="https://ata-sesli.github.io/privacy/" />
</svelte:head>

<main class="container">
	<a href="/">← Ata Sesli</a>
	<h1>Privacy</h1>
	<p>
		This portfolio is hosted on GitHub Pages. Requests to the site are handled by GitHub and its
		delivery infrastructure, which may process technical information such as your IP address and
		request details.
	</p>
	<h2>Optional AI chat</h2>
	<p>
		When you send a chat message, it is sent to a Cloudflare Worker and passed to Google Gemini with
		public project information to generate a response. You can browse the portfolio without using
		the chat.
	</p>
	<p>
		The chat interface keeps the displayed conversation in page memory and sends the current message
		with each request. It does not save that conversation in browser storage. Closing the chat panel
		does not clear it; reloading the page does.
	</p>
	<p>
		Provider logging and retention depend on the service configuration and applicable provider
		policies. This site does not promise that submitted messages are immediately deleted or excluded
		from provider use. Please do not send passwords, confidential information, or sensitive personal
		data.
	</p>
	<h2>Other services</h2>
	<p>
		External project and social links take you to services with their own privacy policies. See the <a
			href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
			>GitHub privacy statement</a
		>, <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>, and
		<a href="https://ai.google.dev/gemini-api/terms">Gemini API terms</a> for more information.
	</p>
	<h2>Contact</h2>
	<p>
		For questions about this site or its handling of information, email <a
			href="mailto:atasesli@protonmail.com">atasesli@protonmail.com</a
		>.
	</p>
</main>

<style>
	main {
		max-width: 760px;
		padding-top: 3rem;
		padding-bottom: 3rem;
	}
	h1 {
		margin: 2rem 0 1rem;
	}
	h2 {
		margin: 2rem 0 0.75rem;
	}
	p {
		margin-bottom: 1rem;
		line-height: 1.8;
	}
	a {
		color: var(--clr-primary);
		text-decoration: underline;
		overflow-wrap: anywhere;
	}
</style>
