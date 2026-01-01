<script lang="ts">
    import { onMount } from 'svelte';
    
    let element: HTMLElement;
    let visible = false;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    });
</script>

<section 
    bind:this={element} 
    class:visible 
    class="section-container"
>
    <slot />
</section>

<style>
    .section-container {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
        margin-bottom: var(--spacing-xl);
    }

    .section-container.visible {
        opacity: 1;
        transform: translateY(0);
    }
</style>
