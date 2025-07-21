<script setup>
    import meWithHat from "@/assets/me_with_hat_cartoon_version.jpeg"
    import { codes } from "@/utils/routes";

    const codings = [
        {
            level: 'easy', 
            desc: 'Saat pertama kali bertemu dengan VueJs atau ReactJs, menghasilkan baris code yang pastinya berantakan, tapi tetap berfungsi',
            tool: 'VueJs / ReactJs'
        },
        {
            level: 'medium', 
            desc: 'Naik kelas disaat sudah merasa bisa, tapi saya coba dengan menyimpan hasilnya di cache atau local storage, agar dapat dikenang',
            tool: 'VueJs / ReactJs - Cache / Local Storage'
        },
        {
            level: 'hard', 
            desc: 'Mungkin ini yang namanya pendewasaan, saya mencoba yang terbaik dengan naik level dan menjadi lebih mudah serta lebih baik',
            tool: 'NuxtJs / NextJs - ExpressJs - MySQL - Cache / Local Storage'
        },
        {
            level: 'expert', 
            desc: 'Setiap langkah akan menjadi lebih sulit, tapi semuanya akan lebih mudah jika melangkah setiap hari',
            tool: 'NuxtJs / NextJs - Cache / Local Storage - Springboot - MySQL'
        },
    ]

    const projects = codes()

    const countLevelProject = (level) => {
        const filterProjects = projects.filter(item => item.level == level);
        return filterProjects.length;
    }

    const convertDate = (date) => {
         const getDate = new Date(date);
         const dates = [getDate.getDate(), getDate.getMonth() - 1, getDate.getFullYear()];
         const fixDate = new Date(dates[2], dates[1], dates[0]);
         return new Intl.DateTimeFormat("id", {dateStyle: "medium"}).format(fixDate);
    }
    const convertIsDone = (date) => {
        try {
            return convertDate(date);
        } catch (error) {
            return date;
        }
    }
</script>

<template>
    <main>
        <section class="hero">
            <div class="image-wrapper">
                <img :src="meWithHat" alt="Kurniawan with hat and glasses" width="100" height="100">
            </div>
            <h1>
                <span>Programming</span>
                <span>Project</span>
            </h1>
            <p>by Kurniawan Pratama</p>
        </section>
        <a v-for="(item, key) in codings" :key="key" :class="['card', item.level]" :href="`/${item.level}`">
            <div>
                <h2 :class="'cl-'+item.level">{{ item.level }} Coding</h2>
                <span>{{ countLevelProject(item.level) }} Projects</span>
            </div>
            <p>{{ item.desc }}</p>
            <p>Tool : {{ item.tool }}</p>
        </a>
        <section class="tracker">
            <h3>Project Tracker</h3>
            <ul>
                <li v-for="({href, level, createdAt, isDone, name}, key) in projects.reverse()" :key :class="['list', level, 'bg-white']">
                    <a :href="`/${level}/${href}`">
                        <span :class="'cl-'+level">{{ name }}</span>
                        <span>Created at : {{ convertDate(createdAt) }}</span>
                        <span>is Done : {{ convertIsDone(isDone) }}</span>
                    </a>
                </li>
            </ul>
        </section>
    </main>
</template>

<style scoped>
    main {
        min-height: 90vh;
        display: grid;
        align-content: start;
        gap: 1rem;
        padding: 10px;
    }
    
    section.hero {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
    section.hero h1 {
        font-size: 1.7rem;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    section.hero p {
        font-style: italic;
    }

    .image-wrapper {
        border: 1px solid black;
        border-radius: 50%;
        overflow: hidden;
        width: 40%;
    }

    .image-wrapper img {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    .card {
        border-radius: 2px;
        margin: 0px 20px;
        min-height: 120px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: linear-gradient(90deg, 
        rgba(255, 255, 255, .5), 
        rgba(255, 255, 255, .1));
        border-left: 5px;
        border-style: solid;
        text-decoration: none;
        color: black;
    }

    a.card div {
        display: flex;
        align-items: center;
        font-size: .8rem;
    }

    a.card h2 {
        font-size: 1.1rem;
        font-weight: bold;
    }

    a.card span {
        margin-left: auto;
        padding-right: 10px;
    }

    a.card p:nth-of-type(1) {
        font-size: .9rem;
    }

    a.card p:nth-of-type(2) {
        margin-top: auto;
        border-color: rgba(0, 0, 0, .5);
        border-width: 1px 0px 0px 0px;
        border-style: solid;
        padding: 3px;
        font-style: italic;
        font-size: .8rem;
        color: rgba(0, 0, 0, .5);
    }

    .tracker {
        padding-bottom: 12px;
    }
    
    .tracker h3 {
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 12px 0px;
        text-decoration-line: underline;
        text-decoration-style: wavy;
        text-decoration-color: rgba(0, 0, 0, .5);
        text-underline-offset: 7px;
    }

    .tracker ul {
        padding: 0px 20px;
    }

    .tracker li {
        margin-bottom: 10px;
        border-left: 4px;
        border-right: 4px;
        border-style: solid;
    }

    .tracker ul li:nth-last-of-type(1) {
        margin-bottom: 0;
    }

    .tracker ul li a {
        text-decoration: none;
        color: black;
        display: grid;
        grid-template-areas: 
        'n n n n'
        'c c d d';
        grid-template-columns: 1fr auto;
        row-gap: 8px;
        padding: 5px
    }

    .tracker ul li a span:nth-child(1) {
        grid-area: n;
        align-self: center;
        font-weight: 600;
    }
    .tracker ul li a span:nth-child(2) {
        grid-area: c;
        font-size: .8rem;
        font-style: italic;
        color: rgba(0, 0, 0, .5);
    }
    .tracker ul li a span:nth-child(3) {
        grid-area: d;
        font-size: .8rem;
        font-style: italic;
        color: rgba(0, 0, 0, .5);
    }

    .easy {
        border-left-color: darkgreen !important;
        border-right-color: rgba(0, 100, 0, .4) !important;
    }
    
    .medium {
        border-left-color: darkblue;
        border-right-color: rgba(0, 0, 139, .8) !important;
    }
    
    .hard {
        border-left-color: darkgoldenrod;
        border-right-color: rgba(255, 140, 0, .8) !important;
    }
    
    .expert {
        border-left-color: darkred;
        border-right-color: rgba(139, 0, 0, .8) !important;
    }

    .bg-white {
        background: linear-gradient(90deg,
        rgba(255, 255, 255, .5),
        rgba(255, 255, 255, .1));
    }

    .cl-easy {
        color: darkgreen !important;
        text-transform: capitalize;
    }
    
    .cl-medium {
        color: darkblue !important;
        text-transform: capitalize;
    }
    
    .cl-hard {
        color: darkgoldenrod !important;
        text-transform: capitalize;
    }
    
    .cl-expert {
        color: darkred !important;
        text-transform: capitalize;
    }
</style>