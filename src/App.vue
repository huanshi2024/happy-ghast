<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import CommentSection from './components/CommentSection.vue';
import FooterSection from './components/FooterSection.vue';
import ChatBox from './components/ChatBox.vue';
import OnlineUsers from './components/OnlineUsers.vue';
</script>

<template>
  <header>
    <!-- Fixed Navigation Bar -->
    <Navbar />
  </header>
  
  <main>
    <!-- Hero Section -->
    <section id="home" aria-label="Homepage introduction">
      <HeroSection />
    </section>
    
    <!-- News Section - Video Display -->
    <section id="news" class="py-16 bg-bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-title text-tech-blue text-center mb-6">
          Latest Happy Ghast News
        </h2>
        <p class="text-center text-text-dark mb-12 max-w-3xl mx-auto">
          Stay updated with the newest features, biomes, and gameplay mechanics in Happy Ghast. Watch our latest dev diary showcasing the Cave & Cliff Update v2.5.
        </p>
        
        <div class="max-w-4xl mx-auto">
          <VideoPlayer />
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section id="features" class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-title text-tech-blue text-center mb-12">
          Happy Ghast Features
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-title text-tech-blue mb-3">Innovative Building System</h3>
            <p class="text-text-dark">Create stunning structures with Happy Ghast's revolutionary block system featuring over 500 unique blocks and textures.</p>
          </article>
          
          <article class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-title text-tech-blue mb-3">Advanced Redstone Mechanics</h3>
            <p class="text-text-dark">Design complex machinery and automated systems with our intuitive and powerful redstone engineering system.</p>
          </article>
          
          <article class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-title text-tech-blue mb-3">Expansive Cave Biomes</h3>
            <p class="text-text-dark">Explore diverse underground environments from crystal caves to deep dark cities teeming with unique resources and dangers.</p>
          </article>
        </div>
      </div>
    </section>
    
    <!-- Community Section - Comment System -->
    <section id="community" class="py-16 bg-bg-white particle-effect">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-title text-tech-blue text-center mb-6">
          Happy Ghast Community
        </h2>
        <p class="text-center text-text-dark mb-12 max-w-3xl mx-auto">
          Connect with fellow Happy Ghast players, share your creations, and join the conversation about the game's latest updates.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Community Image/Description -->
          <div class="md:col-span-5">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                <img 
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22450%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20450%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%3B%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22800%22%20height%3D%22450%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9000015258789%22%20y%3D%22218.3%22%3EHappy%20Ghast%20Community%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  alt="Happy Ghast Community" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-title text-tech-blue mb-4">Join Our Happy Ghast Adventure</h3>
                <p class="text-text-dark font-body mb-4">
                  Connect with players worldwide, share your Happy Ghast creations, and exchange building techniques. Our community welcomes creative builders and adventurers alike!
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">Active Members: 5,243</span>
                  <a href="#" class="text-tech-blue hover:underline">See More &rarr;</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Comment Section -->
          <div class="md:col-span-7">
            <CommentSection />
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <!-- Footer -->
  <footer>
    <FooterSection />
  </footer>

  <!-- Real-time Chat Component -->
  <ChatBox />
  
  <!-- Online Users List -->
  <OnlineUsers />
</template>

<style>
/* Set viewport height */
html, body {
  scroll-behavior: smooth;
}

/* Ensure content areas have appropriate top padding to avoid being hidden by fixed navbar */
section:not(#home) {
  padding-top: 80px;
  margin-top: -80px;
}

/* Provide compatibility for aspect-ratio */
.aspect-w-16 {
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
}
.aspect-h-9 {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
