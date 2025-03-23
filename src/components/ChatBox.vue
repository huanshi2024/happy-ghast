<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';
import { useStorage, useEventListener } from '@vueuse/core';
import * as chatService from '../services/chatService';
import type { ChatMessage, ChatUser } from '../services/chatService';
import { ElMessage } from 'element-plus';

// Chat state
const isOpen = ref(false);
const chatMessages = ref<ChatMessage[]>([]);
const newMessage = ref('');
const username = useStorage('happy-ghast-username', '');
const isUsernameSet = computed(() => username.value && username.value.trim() !== '');
const currentUser = ref<ChatUser | null>(null);
const isConnected = ref(false);
const onlineUsers = ref<ChatUser[]>([]);
const unreadCount = ref(0);
const chatBoxRef = ref<HTMLDivElement | null>(null);

// Initialize chat connection
onMounted(() => {
  if (isUsernameSet.value) {
    connectToChat();
  }
  
  // Listen for message events
  const messageUnsub = chatService.on('message', (message: ChatMessage) => {
    chatMessages.value.push(message);
    
    // If chat window is not open, increase unread count
    if (!isOpen.value && message.userId !== currentUser.value?.id) {
      unreadCount.value++;
    }
    
    // Scroll to bottom
    scrollToBottom();
  });
  
  // Listen for user status changes
  const userStatusUnsub = chatService.on('userStatusChange', (user: ChatUser) => {
    // Update online users list
    updateOnlineUsers();
  });
  
  onUnmounted(() => {
    // Disconnect
    if (currentUser.value) {
      chatService.logout(currentUser.value.id);
    }
    
    // Clean up event listeners
    messageUnsub();
    userStatusUnsub();
  });
});

// Listen for chat window state
watch(isOpen, (newValue) => {
  if (newValue) {
    // When opening chat window, reset unread count and scroll to bottom
    unreadCount.value = 0;
    nextTick(() => {
      scrollToBottom();
    });
  }
});

// Particle effect
function createChatParticle(event: MouseEvent) {
  // Create particle container
  const particles = document.createElement('div');
  particles.style.position = 'fixed';
  particles.style.zIndex = '40';
  particles.style.left = `${event.clientX}px`;
  particles.style.top = `${event.clientY}px`;
  document.body.appendChild(particles);
  
  // Create multiple particles
  const colors = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
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

// Get formatted time
function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Connect to chat
function connectToChat() {
  if (!username.value.trim()) {
    ElMessage.warning('Please enter a username');
    return;
  }
  
  try {
    // Login/register user
    currentUser.value = chatService.login(username.value.trim());
    isConnected.value = true;
    
    // Get initial messages and user list
    chatMessages.value = chatService.getMessages();
    updateOnlineUsers();
    
    // Add system message for current user
    const welcomeMessage: chatService.ChatMessage = {
      id: crypto.randomUUID(),
      userId: 'system',
      username: 'System',
      text: `Welcome to the chat, ${username.value}!`,
      timestamp: new Date()
    };
    chatMessages.value.push(welcomeMessage);
    
    // Open chat window
    setTimeout(() => {
      isOpen.value = true;
      scrollToBottom();
    }, 300);
  } catch (error) {
    console.error('Error connecting to chat:', error);
    ElMessage.error('Failed to connect to chat. Please try again.');
  }
}

// Update online users list
function updateOnlineUsers() {
  onlineUsers.value = chatService.getOnlineUsers();
}

// Toggle chat window display
function toggleChat() {
  isOpen.value = !isOpen.value;
  
  if (isOpen.value) {
    unreadCount.value = 0;
    nextTick(() => {
      scrollToBottom();
    });
  }
}

// Set username
function setUsername() {
  if (!username.value || username.value.trim() === '') {
    ElMessage.warning('Please enter a username');
    return;
  }
  
  connectToChat();
}

// Send message
function sendMessage() {
  if (!newMessage.value.trim() || !currentUser.value) return;
  
  try {
    // Create message directly to ensure immediate feedback
    const message = chatService.sendMessage(currentUser.value.id, newMessage.value.trim());
    
    // Clear input field
    newMessage.value = '';
    
    // Scroll to bottom
    scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
    ElMessage.error('Failed to send message. Please try again.');
  }
}

// Scroll to bottom
function scrollToBottom() {
  nextTick(() => {
    if (chatBoxRef.value) {
      chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
    }
  });
}

// Handle keydown event
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Add window size change listener
useEventListener(window, 'resize', () => {
  if (isOpen.value) {
    scrollToBottom();
  }
});

onMounted(() => {
  if (isUsernameSet.value) {
    connectToChat();
  }
});

onUnmounted(() => {
  if (currentUser.value) {
    chatService.logout(currentUser.value.id);
  }
});
</script>

<template>
  <!-- Chat button -->
  <div 
    class="fixed bottom-6 right-6 z-50 flex items-center justify-center cursor-pointer"
    @click="toggleChat"
    @mousedown="createChatParticle"
  >
    <div class="relative">
      <div 
        class="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <!-- Unread message indicator -->
      <div v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </div>
    </div>
  </div>

  <!-- Chat window -->
  <div
    v-show="isOpen"
    class="fixed bottom-24 right-6 w-80 sm:w-96 bg-gray-900 rounded-lg shadow-xl overflow-hidden z-50 border border-gray-700 transition-all duration-300"
    style="max-height: 500px; min-height: 400px;"
  >
    <!-- Chat header -->
    <div class="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full mr-2" :class="isConnected ? 'bg-green-500' : 'bg-red-500'"></div>
        <h3 class="text-white font-medium">Game Chat Room</h3>
      </div>
      <div class="text-gray-300 text-sm">
        {{ onlineUsers.length }} people online
      </div>
      <button @click="toggleChat" class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Username setting -->
    <div v-if="!isUsernameSet" class="flex flex-col items-center justify-center h-full p-6">
      <div class="text-center mb-6">
        <h4 class="text-white text-lg font-medium mb-2">Please enter a username</h4>
        <p class="text-gray-400 text-sm">You need a username to join the chat</p>
      </div>
      
      <div class="w-full max-w-xs">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Username..." 
          class="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          @keyup.enter="connectToChat"
        />
        
        <button 
          @click="connectToChat"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition-colors"
          :disabled="!username.trim()"
        >
          Start Chatting
        </button>
      </div>
    </div>

    <!-- Chat messages -->
    <template v-else>
      <div ref="chatBoxRef" class="overflow-y-auto p-4" style="height: calc(100% - 110px)">
        <div v-for="message in chatMessages" :key="message.id" class="mb-4">
          <!-- System message -->
          <div v-if="message.userId === 'system'" class="flex justify-center">
            <div class="bg-gray-800 text-gray-400 rounded-full px-3 py-1 text-xs">
              {{ message.text }}
            </div>
          </div>
          
          <!-- Normal message -->
          <div v-else class="flex" :class="message.userId === currentUser?.id ? 'justify-end' : 'justify-start'">
            <div 
              class="max-w-[80%] rounded-lg px-3 py-2 break-words"
              :class="message.userId === currentUser?.id ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'"
            >
              <!-- Username, only show username for other user's messages -->
              <div v-if="message.userId !== currentUser?.id" class="text-emerald-300 text-sm font-medium mb-1">
                {{ message.username }}
              </div>
              
              <!-- Message content -->
              <div>{{ message.text }}</div>
              
              <!-- Timestamp -->
              <div class="text-right mt-1">
                <span class="text-xs opacity-70">{{ formatTime(message.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message input area -->
      <div class="bg-gray-800 p-3 border-t border-gray-700">
        <div class="flex">
          <textarea
            v-model="newMessage"
            @keydown="handleKeydown"
            class="flex-grow bg-gray-700 text-white rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            placeholder="Enter message..."
            rows="2"
          ></textarea>
          <button
            @click="sendMessage"
            @mousedown="createChatParticle"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-r font-medium transition-colors focus:outline-none"
            :disabled="!newMessage.trim() || !currentUser"
          >
            Send
          </button>
        </div>
        <div class="text-gray-400 text-xs mt-1">
          Press Enter to send message, Shift+Enter to create a new line
        </div>
      </div>
    </template>
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