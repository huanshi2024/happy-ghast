<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// Comment interface
interface Comment {
  username: string;
  content: string;
  timestamp: string;
  id: string;
}

// State
const username = ref(localStorage.getItem('username') || '');
const commentText = ref('');
const comments = reactive<Comment[]>([
  {
    username: 'Game Expert',
    content: 'This video is amazing! Looking forward to the next update. Happy Ghast\'s new mining system looks much more intuitive.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    id: '1'
  },
  {
    username: 'Pixel Artist',
    content: 'The scene design is stunning, I wonder how the development team achieved these lighting effects? The nether biomes look incredibly atmospheric.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    id: '2'
  },
  {
    username: 'BlockMaster365',
    content: 'Happy Ghast\'s building system is revolutionary! The new block types and textures make everything look so much better than other block games.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    id: '3'
  },
  {
    username: 'RedstoneEngineer',
    content: 'I\'ve been testing the new redstone mechanics in the beta, and I\'m amazed at how much more intuitive it is. Happy Ghast definitely improved on existing formulas.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    id: '4'
  }
]);
const isSubmitting = ref(false);

// Submit comment
function submitComment(event: Event) {
  // Prevent default form submission
  event.preventDefault();
  
  // Validate fields
  if (!username.value.trim()) {
    ElMessage.warning('Please enter a username');
    return;
  }
  
  if (!commentText.value.trim()) {
    ElMessage.warning('Please enter a comment');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Create comment
    const newComment: Comment = {
      username: username.value,
      content: commentText.value,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    };
    
    // Add to comments
    comments.unshift(newComment);
    
    // Save username for future use
    localStorage.setItem('username', username.value);
    
    // Clear comment text
    commentText.value = '';
    
    // Show success message
    ElMessage.success('Comment added successfully!');
    
    // Create particle effect
    createParticles();
  } catch (error) {
    console.error('Error adding comment:', error);
    ElMessage.error('Failed to add comment. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

// Load saved username on mount
onMounted(() => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    username.value = savedUsername;
  }
});

// Particle effect
function createParticles() {
  const submitBtn = document.querySelector('.submit-btn');
  if (!submitBtn) return;
  
  const rect = submitBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-2 h-2 rounded-full animate-particle pointer-events-none';
    particle.style.backgroundColor = Math.random() > 0.5 ? '#3A5CAA' : '#FF6B6B';
    particle.style.top = `${centerY}px`;
    particle.style.left = `${centerX}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      document.body.removeChild(particle);
    }, 2000);
  }
}

// Format time
function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 1 minute
  if (diff < 60 * 1000) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))} minutes ago`;
  }
  
  // Less than 24 hours
  if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
  }
  
  // Other cases
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
</script>

<template>
  <div class="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-700">
    <h2 class="text-2xl font-bold text-white mb-6">Comments</h2>
    
    <!-- Comment form -->
    <form @submit="submitComment" class="mb-8">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium text-gray-300 mb-1">Comment</label>
        <textarea
          v-model="commentText"
          id="comment"
          rows="4"
          class="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          placeholder="Enter your comment..."
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Post Comment' }}
      </button>
    </form>
    
    <!-- Comment List -->
    <div class="space-y-4">
      <div 
        v-for="comment in comments" 
        :key="comment.id" 
        class="bg-bg-white p-4 rounded-lg shadow transition-all hover:shadow-md"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-title text-lg text-tech-blue">{{ comment.username }}</h3>
          <span class="text-sm text-gray-500">{{ formatTime(new Date(comment.timestamp)) }}</span>
        </div>
        <p class="text-text-dark font-body">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>