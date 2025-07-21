<script setup>

</script>

<template>
    <nav>
        <ul>
            <li><a href="https://instagram.com/krnwnprtm">@krnwnprtm</a></li>
            <li><a href="/">home</a></li>
            <li><a href="/">blog</a></li>
        </ul>
    </nav>
</template>

<style scoped>
    nav {
        height: 5vh;
        padding: 5px;
    }

    ul {
        display: flex;
        justify-content: start;
        gap: 10px;
    }

    li:nth-of-type(2) {
        margin-left:auto;
    }

    li a {
        font-style: italic;
        padding: 5px 0px;
        display: block;
        text-decoration: none;
        color: black;
        font-weight: 500;
        font-size: 1rem;
    }

</style>