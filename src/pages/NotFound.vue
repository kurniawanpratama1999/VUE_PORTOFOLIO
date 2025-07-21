<script setup>
    const path = window.location.pathname
</script>

<template>
    <section>
        <p>path: {{ path }}</p>
        <h1>NOT FOUND</h1>
        <a href="/">Back Home</a>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
        gap: 10px;
    }

    section h1 {
        font-family: 'Courier New', Courier, monospace;
        font-size: 2rem;
        font-weight: bolder;
        letter-spacing: 2px;
    }

    section p {
        font-style: italic;
        font-size: 1.2rem;
    }

    section a {
        border: 1px solid blue;
        padding: 5px 10px;
        border-radius: 3px;
        background-color: lightblue;
        text-decoration: none;
        color: blue;
    }
</style>