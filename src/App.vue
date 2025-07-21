<script setup>

  import { ref, computed } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Home from '@/pages/Home.vue';
  import NotFound from '@/pages/NotFound.vue';
  import Calculator from './pages/easy/Calculator.vue';
import Todo from './pages/easy/Todo.vue';
import ExpenseTracker from './pages/easy/ExpenseTracker.vue';


  const routes = {
    '/': Home,
    '/easy/calculator': Calculator,
    '/easy/todo': Todo,
    '/easy/expense_tracker': ExpenseTracker
  }

  const currentPath = ref(window.location.pathname);

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.pathname;
  })

  const currentView = computed(() => {
    const cp = currentPath.value;
    return routes[cp] || NotFound;
  })


</script>

<template>
  <Navbar/>
  <component :is="currentView"/>
</template>

<style src="./assets/App.css"/>