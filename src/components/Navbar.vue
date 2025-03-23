<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-lg z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="/logo.svg" alt="Happy Ghast" class="h-10 w-auto mr-3" />
        <h1 class="text-tech-blue text-2xl font-title">Happy Ghast</h1>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        <a href="#home" class="text-text-dark hover:text-tech-blue font-body transition-colors">Home</a>
        <a href="#news" class="text-text-dark hover:text-tech-blue font-body transition-colors">News</a>
        <a href="#community" class="text-text-dark hover:text-tech-blue font-body transition-colors">Community</a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-text-dark focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white py-2 px-4 shadow-lg">
      <a href="#home" class="block py-2 text-text-dark hover:text-tech-blue font-body" @click="toggleMenu">Home</a>
      <a href="#news" class="block py-2 text-text-dark hover:text-tech-blue font-body" @click="toggleMenu">News</a>
      <a href="#community" class="block py-2 text-text-dark hover:text-tech-blue font-body" @click="toggleMenu">Community</a>
    </div>
  </nav>
</template> 