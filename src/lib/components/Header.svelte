<script lang="ts">
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
    <div class="container header-inner">
        <a href="/" class="logo text-gradient">Ata Sesli</a>
        
        <nav>
            <a href="#projects" class="nav-link">Projects</a>
            <a href="#about" class="nav-link">About Me</a>
        </nav>
    </div>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
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
    }

    .logo {
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
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
</style>
