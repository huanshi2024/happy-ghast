<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStorage, useEventListener } from '@vueuse/core';
import type { ChatUser } from '../services/chatService';
import * as chatService from '../services/chatService';

// State
const isOpen = ref(false);
const users = ref<ChatUser[]>([]);
const username = useStorage('happy-ghast-username', '');
const isUsernameSet = computed(() => username.value && username.value.trim() !== '');
const currentUser = ref<ChatUser | null>(null);

// Get user list and set listeners
onMounted(() => {
  // If user is logged in, get current user info
  if (isUsernameSet.value) {
    const existingUser = chatService.getOnlineUsers().find(u => u.username === username.value);
    if (existingUser) {
      currentUser.value = existingUser;
    }
  }
  
  // Get initial user list
  updateUserList();
  
  // Set status change listeners
  const userStatusListener = chatService.on('userStatusChange', (user: ChatUser) => {
    updateUserList();
  });
  
  const userJoinedListener = chatService.on('userJoined', (user: ChatUser) => {
    updateUserList();
  });
  
  onUnmounted(() => {
    userStatusListener();
    userJoinedListener();
  });
});

// Update user list
function updateUserList() {
  users.value = chatService.getOnlineUsers().sort((a, b) => {
    // System user at the end
    if (a.id === 'system') return 1;
    if (b.id === 'system') return -1;
    
    // Current user at the beginning
    if (currentUser.value) {
      if (a.id === currentUser.value.id) return -1;
      if (b.id === currentUser.value.id) return 1;
    }
    
    // Sort by last active time
    return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
  });
}

// Get last active time display text
function getLastActiveText(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  
  // Less than 1 minute show "Just now"
  if (diff < 60 * 1000) {
    return 'Just now';
  }
  
  // Less than 1 hour show minutes
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes} minutes ago`;
  }
  
  // Less than 1 day show hours
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} hours ago`;
  }
  
  // Otherwise show days
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  return `${days} days ago`;
}

// Toggle user list display
function toggleUserList() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    updateUserList();
  }
}

// Create particle effect
function createParticle(event: MouseEvent) {
  // Create particle container
  const particles = document.createElement('div');
  particles.style.position = 'fixed';
  particles.style.zIndex = '40';
  particles.style.left = `${event.clientX}px`;
  particles.style.top = `${event.clientY}px`;
  document.body.appendChild(particles);
  
  // Create multiple particles
  const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    
    const angle = (i * (360 / particleCount)) * (Math.PI / 180);
    const velocity = 4 + Math.random() * 2;
    let posX = 0;
    let posY = 0;
    
    // Add to container
    particles.appendChild(particle);
    
    // Animation
    const frameRate = 1000 / 60;
    let opacity = 1;
    
    const animate = () => {
      posX += Math.cos(angle) * velocity;
      posY += Math.sin(angle) * velocity;
      opacity -= 0.03;
      
      particle.style.transform = `translate(${posX}px, ${posY}px) scale(${opacity})`;
      particle.style.opacity = opacity.toString();
      
      if (opacity > 0) {
        setTimeout(animate, frameRate);
      } else {
        particle.remove();
        if (particles.childElementCount === 0) {
          particles.remove();
        }
      }
    };
    
    setTimeout(animate, 0);
  }
}

// Add window size change listener
useEventListener(window, 'resize', () => {
  if (isOpen.value) {
    // When adjusting window size, you may need to update the position or style of the user list
  }
});
</script>

<template>
  <!-- Online users button -->
  <div 
    class="fixed bottom-6 left-6 z-50 flex items-center justify-center cursor-pointer"
    @click="toggleUserList"
    @mousedown="createParticle"
  >
    <div class="relative">
      <div 
        class="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <div class="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {{ users.length }}
      </div>
    </div>
  </div>

  <!-- User list panel -->
  <div
    v-show="isOpen"
    class="fixed bottom-24 left-6 w-64 sm:w-72 bg-gray-900 rounded-lg shadow-xl overflow-hidden z-50 border border-gray-700 transition-all duration-300"
    style="max-height: 400px;"
  >
    <!-- Panel header -->
    <div class="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
      <h3 class="text-white font-medium">Online Players</h3>
      <button @click="toggleUserList" class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- User list -->
    <div class="overflow-y-auto" style="max-height: calc(400px - 50px);">
      <ul class="divide-y divide-gray-700">
        <li 
          v-for="user in users" 
          :key="user.id" 
          class="px-4 py-3 hover:bg-gray-800 transition-colors"
          :class="{
            'bg-gray-800': currentUser && user.id === currentUser.id
          }"
        >
          <div class="flex items-center space-x-3">
            <!-- User avatar -->
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-medium text-white">
                {{ user.username.charAt(0).toUpperCase() }}
              </div>
              <div 
                class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900"
                :class="user.isOnline ? 'bg-green-500' : 'bg-gray-500'"
              ></div>
            </div>
            
            <!-- User info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">
                {{ user.username }}
                <span v-if="currentUser && user.id === currentUser.id" class="text-xs text-blue-400 ml-1">(You)</span>
                <span v-if="user.id === 'system'" class="text-xs text-yellow-400 ml-1">(System)</span>
              </p>
              <p class="text-xs text-gray-400">
                {{ user.isOnline ? 'Online' : 'Offline • ' + getLastActiveText(user.lastActive) }}
              </p>
            </div>
            
            <!-- Status indicator -->
            <div class="flex-shrink-0">
              <span 
                v-if="user.isOnline" 
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
              >
                Online
              </span>
              <span 
                v-else 
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                Offline
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgba(31, 41, 55, 0.8);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.8);
}
</style> 