<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-text-dark text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Introduction -->
        <div>
          <div class="flex items-center mb-4">
            <img src="/logo.svg" alt="Happy Ghast Logo" class="h-8 w-auto mr-2" />
            <h3 class="text-xl font-title text-energy-red">Happy Ghast</h3>
          </div>
          <p class="text-gray-400 font-body mb-4">
            The ultimate voxel building game with revolutionary redstone mechanics, stunning cave biomes, and a creative community of builders and explorers.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-neon-effect transition-colors" aria-label="Facebook">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-neon-effect transition-colors" aria-label="Twitter">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-neon-effect transition-colors" aria-label="Instagram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-neon-effect transition-colors" aria-label="Discord">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.129a12.299 12.299 0 0 1-1.873.891a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-title mb-4 text-neon-effect">Game Features</h3>
          <ul class="space-y-2 font-body">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Building System</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Redstone Mechanics</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cave Biomes</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Multiplayer</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Texture Packs</a></li>
          </ul>
        </div>
        
        <!-- Community Links -->
        <div>
          <h3 class="text-lg font-title mb-4 text-neon-effect">Community</h3>
          <ul class="space-y-2 font-body">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Forums</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Discord Server</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Build Showcase</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Download Mods</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Report Bugs</a></li>
          </ul>
        </div>
        
        <!-- Subscribe -->
        <div>
          <h3 class="text-lg font-title mb-4 text-neon-effect">Subscribe to Updates</h3>
          <p class="text-gray-400 font-body mb-4">
            Get the latest Happy Ghast news, update announcements, and community events directly to your inbox
          </p>
          <form class="flex">
            <input 
              type="email" 
              placeholder="Your Email" 
              class="bg-gray-800 text-white px-4 py-2 rounded-l outline-none flex-grow"
              aria-label="Email subscription"
            />
            <button 
              type="submit" 
              class="bg-energy-red text-white px-4 py-2 rounded-r hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <!-- Copyright and Legal -->
      <div class="mt-8 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="text-gray-500 font-body">
          <p>© {{ currentYear }} Happy Ghast. All rights reserved.</p>
        </div>
        <div class="flex space-x-4 justify-start md:justify-end text-sm">
          <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="#" class="text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template> 