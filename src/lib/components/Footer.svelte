<script lang="ts">
    const year = new Date().getFullYear();
</script>

<footer>
    <div class="container footer-content">
        <p>&copy; {year} Ata Sesli. All rights reserved.</p>
        <p class="built-with">Built with <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a> & Love</p>
    </div>
</footer>

<style>
    footer {
        padding: var(--spacing-xl) 0;
        margin-top: var(--spacing-xl);
        border-top: 1px solid var(--clr-glass-border);
        text-align: center;
        font-size: 0.875rem;
    }

    .footer-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        opacity: 0.6;
    }

    .built-with a {
        color: var(--clr-primary);
    }
</style>
