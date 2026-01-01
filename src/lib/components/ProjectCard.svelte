<script lang="ts">
    import { ExternalLink, Github } from 'lucide-svelte';
    
    export let project: {
        name: string;
        description: string;
        tags: string;
        "github-link": string;
        "website-link": string;
    };

    // Parse tags string into an array if needed, assuming comma separated
    $: tagsArray = project.tags.split(',').map(t => t.trim());
</script>

<div class="project-card glass-panel">
    <div class="card-content">
        <h3 class="project-title">{project.name}</h3>
        <p class="project-desc">{project.description}</p>
        
        <div class="tags">
            {#each tagsArray as tag}
                <span class="tag">{tag}</span>
            {/each}
        </div>

        <div class="links">
            {#if project['github-link']}
                <a href={project['github-link']} target="_blank" rel="noopener noreferrer" class="link-btn" aria-label="GitHub">
                    <Github size={20} />
                </a>
            {/if}
            {#if project['website-link']}
                <a href={project['website-link']} target="_blank" rel="noopener noreferrer" class="link-btn" aria-label="Website">
                    <ExternalLink size={20} />
                </a>
            {/if}
        </div>
    </div>
</div>

<style>
    .project-card {
        padding: var(--spacing-lg);
        transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px -10px rgba(109, 40, 217, 0.3);
        border-color: var(--clr-primary-glow);
    }

    .project-title {
        font-size: 1.5rem;
        margin-bottom: var(--spacing-sm);
        color: var(--clr-text-main);
    }

    .project-desc {
        color: var(--clr-text-muted);
        margin-bottom: var(--spacing-md);
        flex-grow: 1;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
    }

    .tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--clr-glass-border);
        color: var(--clr-text-muted);
    }

    .links {
        display: flex;
        gap: var(--spacing-md);
        margin-top: auto;
    }

    .link-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        transition: background 0.2s, transform 0.2s;
    }

    .link-btn:hover {
        background: var(--clr-primary);
        transform: scale(1.1);
        color: white;
    }
</style>
