<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Background particle effect
const particleCount = 50;
const particles = ref<Array<{ x: number; y: number; size: number; speed: number; color: string }>>([]);

// Initialize particles
onMounted(() => {
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: i % 2 === 0 ? '#3A5CAA' : '#00FFEE'
    });
  }

  // Animation loop
  function animateParticles() {
    particles.value = particles.value.map(particle => {
      return {
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y / 30) * 0.3,
        // If particle reaches the top, reposition at the bottom
        ...(particle.y < 0 ? { y: 100, x: Math.random() * 100 } : {})
      };
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});
</script>

<template>
  <div class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background image -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full bg-gradient-to-b from-tech-blue to-neon-effect opacity-20"></div>
    </div>
    
    <!-- Particle effect -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div
        v-for="(particle, index) in particles"
        :key="index"
        class="absolute rounded-full"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          backgroundColor: particle.color,
          opacity: 0.6
        }"
      ></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-20 text-center px-4">
      <h1 class="text-5xl md:text-7xl font-title text-white mb-6 animate-float">
        <span class="text-tech-blue">Happy</span> 
        <span class="text-energy-red">Ghast</span>
      </h1>
      <p class="text-xl md:text-2xl font-body text-white mb-6 max-w-2xl mx-auto">
        Explore endless possibilities in the world of blocks, create amazing structures, and survive thrilling adventures!
      </p>
      <p class="text-lg font-body text-white mb-10 max-w-2xl mx-auto">
        Join over 5 million players building, mining, and exploring in the most innovative voxel game since 2022.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#news" class="game-btn text-lg py-3 px-8">News & Updates</a>
        <a href="#community" class="bg-tech-blue text-white py-3 px-8 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg">Join Community</a>
      </div>
      <div class="mt-8 text-white text-sm">
        <span class="bg-energy-red px-2 py-1 rounded">New!</span> 
        <span class="ml-2">Cave & Cliff Update v2.5 is now live! Explore new biomes and creatures.</span>
      </div>
    </div>
  </div>
</template> 