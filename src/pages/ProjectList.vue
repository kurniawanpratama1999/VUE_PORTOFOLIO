<script setup>
    import { codes } from '@/utils/routes';
    const list = codes().sort((a, b) => b.createdAt - a.createdAt)
    const path = window.location.pathname.slice(1)
    const isList = list.find(code => code.level === path)
</script>

<template>
    <section>
        <h2>List of <span>{{ path }}</span> Code</h2>

        <p v-if="isList === undefined">Sorry dude the code is not created yet</p>

        <ul>
            <li v-for="(item, key) in list" :key>
                <a v-if="item.level === path" :href="`/${item.level}/${item.href}`">
                    <span>{{ item.name }}</span>
                    <span>{{ new Intl.DateTimeFormat("id", {dateStyle: "medium"}).format(item.createdAt) }}</span>
                </a>
            </li>
        </ul>
    </section>
</template>

<style scoped>

    section {
        padding: 0px 10px;
    }

    p {
        text-align: center;
        font-size: 1.2rem;
        font-style: italic;
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 16px;
        color: whitesmoke;
        text-shadow: 2px 2px black;
    }

    h2 span {
        text-transform: capitalize;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    ul a {
        display: flex;
        justify-content: space-between;
        font-family: 'Courier New', Courier, monospace;
        padding: 10px 5px;
        text-decoration: none;
        color: black;
        background: linear-gradient(90deg, rgba(255, 255, 255, .7), rgba(255, 255, 255, .2));
        border-radius: 5px;
    }

    ul a span:nth-child(2) {
        font-style: italic;
        font-size: .9rem;
        color: rgba(0, 0, 0, .6);
    }

</style>