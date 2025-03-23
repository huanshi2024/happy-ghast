<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useEventListener } from '@vueuse/core';

const isMuted = ref(false);
const isPlaying = ref(true);
const videoId = ref('jGNgh5zEFkY');
const playerRef = ref<HTMLIFrameElement | null>(null);
const isFullscreen = ref(false);
const volume = ref(100);
const currentTime = ref(0);
const duration = ref(100);
const progress = ref(0);
const isReady = ref(false);

// Initialize YouTube API
onMounted(() => {
  // Add YouTube API
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }

  // Set up player API listener
  window.onYouTubeIframeAPIReady = () => {
    isReady.value = true;
    setupPlayer();
  };

  // If API already loaded
  if (window.YT && window.YT.Player) {
    isReady.value = true;
    setupPlayer();
  }
});

let player: any = null;
function setupPlayer() {
  if (!isReady.value) return;
  
  // Clear existing iframe
  const container = document.getElementById('youtube-player-container');
  if (container) {
    container.innerHTML = '';
    
    player = new window.YT.Player(container, {
      height: '100%',
      width: '100%',
      videoId: videoId.value,
      playerVars: {
        autoplay: 1,
        mute: 0,
        loop: 1,
        playlist: videoId.value,
        modestbranding: 1,
        rel: 0,
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3,
        fs: 0,
        cc_load_policy: 0,
        hl: 'en'
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
          if (!isMuted.value) {
            event.target.unMute();
          }
          duration.value = event.target.getDuration();
          // Start progress tracking
          setInterval(updateProgress, 500);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            isPlaying.value = true;
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            isPlaying.value = false;
          }
        }
      }
    });
  }
}

function updateProgress() {
  if (player && typeof player.getCurrentTime === 'function') {
    currentTime.value = player.getCurrentTime();
    progress.value = (currentTime.value / duration.value) * 100;
  }
}

function setProgress(event: MouseEvent) {
  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const pos = (event.clientX - rect.left) / rect.width;
  const newTime = pos * duration.value;
  
  if (player && typeof player.seekTo === 'function') {
    player.seekTo(newTime, true);
  }
}

// Volume control
function setVolume(value: number) {
  volume.value = value;
  if (player && typeof player.setVolume === 'function') {
    player.setVolume(value);
  }
}

function toggleMute() {
  isMuted.value = !isMuted.value;
  if (player) {
    if (isMuted.value) {
      player.mute();
    } else {
      player.unMute();
    }
  }
}

function togglePlay() {
  isPlaying.value = !isPlaying.value;
  if (player) {
    if (isPlaying.value) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.querySelector('.video-wrapper')?.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Format time (MM:SS)
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Track fullscreen state
useEventListener(document, 'fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement;
});

// Particle effect
const particles = ref<Array<{ id: number; top: number; left: number }>>([]);
let particleId = 0;

function createParticle(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  
  for (let i = 0; i < 5; i++) {
    particles.value.push({
      id: particleId++,
      top: y - Math.random() * 20,
      left: x - Math.random() * 20
    });
  }
  
  // Remove old particles
  setTimeout(() => {
    particles.value = particles.value.slice(5);
  }, 2000);
}

// Add particle effect event listener for buttons
useEventListener(document, 'mousedown', (e) => {
  if ((e.target as HTMLElement).closest('.control-btn')) {
    createParticle(e as MouseEvent);
  }
});

// Detect and handle click on the video area to toggle play/pause
function handleVideoAreaClick(event: MouseEvent) {
  // Only respond if not clicking on controls
  if (!(event.target as HTMLElement).closest('.control-btn') && 
      !(event.target as HTMLElement).closest('input')) {
    togglePlay();
    createParticle(event);
  }
}
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-lg shadow-xl mx-auto max-w-5xl video-wrapper">
    <!-- Video container with click handler -->
    <div class="relative pb-[62.5%] h-0 bg-black" @click="handleVideoAreaClick">
      <div id="youtube-player-container" class="absolute top-0 left-0 w-full h-full"></div>
      
      <!-- Custom video controls overlay -->
      <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <!-- Progress bar (functional) -->
        <div 
          class="w-full h-2 bg-gray-700 mb-2 cursor-pointer" 
          @click="setProgress"
        >
          <div class="h-full bg-red-500" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <!-- Control buttons -->
        <div class="flex items-center justify-between px-4 pb-3">
          <div class="flex items-center space-x-3">
            <button @click="togglePlay" class="control-btn text-white p-2 rounded-full hover:bg-white/20 transition-all">
              <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            
            <button @click="toggleMute" class="control-btn text-white p-2 rounded-full hover:bg-white/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isMuted" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path v-if="isMuted" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
            
            <div class="flex items-center space-x-2">
              <input 
                type="range" 
                min="0" 
                max="100" 
                v-model="volume" 
                @input="setVolume(Number(volume))"
                class="w-20 h-1" 
              />
            </div>
            
            <div class="text-white text-sm ml-2">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <button @click="toggleFullscreen" class="control-btn text-white p-2 rounded-full hover:bg-white/20 transition-all">
              <svg v-if="!isFullscreen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Particle effect -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute w-3 h-3 rounded-full bg-neon-effect animate-particle"
        :style="{ top: `${particle.top}px`, left: `${particle.left}px` }"
      ></div>
    </div>
  </div>
</template>

<style>
.video-wrapper:fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}

.video-wrapper:fullscreen .pb-[62.5%] {
  padding-bottom: 0 !important;
  height: 100% !important;
}
</style>

<script lang="ts">
// Add TypeScript definitions for window.YT
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
</script> 