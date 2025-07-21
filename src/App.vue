<script setup>

  import { ref, computed } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import NotFound from '@/pages/NotFound.vue';
  import { routes } from './utils/routes';

  const route = routes()

  const currentPath = ref(window.location.pathname);

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.pathname;
  })

  const currentView = computed(() => {
    const cp = currentPath.value;
    return route[cp] || NotFound;
  })


</script>

<template>
  <Navbar/>
  <component :is="currentView"/>
</template>

<style src="./assets/App.css"/>