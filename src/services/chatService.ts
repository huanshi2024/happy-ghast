import { ref } from 'vue';
import { EventEmitter } from 'events';

// Mock server events
const eventEmitter = new EventEmitter();

// Interface definitions
export interface ChatUser {
  id: string;
  username: string;
  isOnline: boolean;
  lastActive: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  users: ChatUser[];
  messages: ChatMessage[];
}

// Mock data
const users = ref<ChatUser[]>([
  { id: 'system', username: 'System', isOnline: true, lastActive: new Date() },
  { id: 'user1', username: 'Pixel Warrior', isOnline: true, lastActive: new Date() },
  { id: 'user2', username: 'Block Craftsman', isOnline: true, lastActive: new Date() },
  { id: 'user3', username: 'Redstone Expert', isOnline: false, lastActive: new Date(Date.now() - 1000 * 60 * 5) },
  { id: 'user4', username: 'Game Expert', isOnline: true, lastActive: new Date() },
  { id: 'user5', username: 'Adventurer', isOnline: true, lastActive: new Date() },
  { id: 'user6', username: 'Architect', isOnline: false, lastActive: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 'user7', username: 'Collector', isOnline: true, lastActive: new Date() },
  { id: 'user8', username: 'Command Master', isOnline: true, lastActive: new Date() },
]);

const generalRoom: ChatRoom = {
  id: 'general',
  name: 'Game Lobby',
  description: 'Discuss all game-related topics',
  users: users.value.filter(user => user.isOnline),
  messages: [
    { id: 'm1', userId: 'user1', username: 'Pixel Warrior', text: 'Does anyone know the latest Happy Ghast update content? I heard they added new cave biomes.', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 'm2', userId: 'user2', username: 'Block Craftsman', text: 'Just found a huge diamond vein in the new caves! The ore distribution in Happy Ghast is so much better now.', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    { id: 'm3', userId: 'user5', username: 'Adventurer', text: 'Anyone want to team up to explore the nether fortress? The new ghast variants are really challenging!', timestamp: new Date(Date.now() - 1000 * 60 * 20) },
    { id: 'm4', userId: 'user4', username: 'Game Expert', text: 'The graphics in Happy Ghast are getting more and more stunning with the new shader update', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: 'm5', userId: 'user8', username: 'Command Master', text: 'I think new hostile mobs will be added in the next Happy Ghast update, the teaser showed something in the shadows', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    { id: 'm6', userId: 'user7', username: 'Collector', text: 'Can anyone share some redstone building tips? I\'m trying to make an automatic farm with the new mechanics.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  ]
};

const rooms = ref<ChatRoom[]>([generalRoom]);

// Generate ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Create status change particle effect
export function createStatusChangeParticle(username: string, isOnline: boolean) {
  // Create particle container
  const particles = document.createElement('div');
  particles.style.position = 'fixed';
  particles.style.zIndex = '40';
  particles.style.left = '50%';
  particles.style.top = '50%';
  particles.style.transform = 'translate(-50%, -50%)';
  particles.style.pointerEvents = 'none';
  document.body.appendChild(particles);
  
  // Create username label
  const label = document.createElement('div');
  label.style.position = 'absolute';
  label.style.color = 'white';
  label.style.fontSize = '16px';
  label.style.fontWeight = 'bold';
  label.style.textAlign = 'center';
  label.style.backgroundColor = isOnline ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  label.style.padding = '4px 12px';
  label.style.borderRadius = '16px';
  label.style.transform = 'translate(-50%, -50%)';
  label.style.whiteSpace = 'nowrap';
  label.textContent = `${username} ${isOnline ? 'is online' : 'is offline'}`;
  particles.appendChild(label);
  
  // Create multiple particles
  const colors = isOnline ? 
    ['rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.6)', 'rgba(16, 185, 129, 0.4)'] : 
    ['rgba(239, 68, 68, 0.8)', 'rgba(239, 68, 68, 0.6)', 'rgba(239, 68, 68, 0.4)'];
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    
    // Random starting position around the center
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 30;
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    
    particle.style.transform = `translate(${startX}px, ${startY}px)`;
    particles.appendChild(particle);
    
    // Animation
    const animate = () => {
      const expandDistance = 100 + Math.random() * 50;
      const duration = 1000 + Math.random() * 500;
      
      particle.animate([
        { transform: `translate(${startX}px, ${startY}px)`, opacity: 1 },
        { transform: `translate(${Math.cos(angle) * expandDistance}px, ${Math.sin(angle) * expandDistance}px)`, opacity: 0 }
      ], {
        duration,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        fill: 'forwards'
      });
    };
    
    setTimeout(animate, Math.random() * 200);
  }
  
  // Fade out the label
  const fadeOut = () => {
    label.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 800,
      delay: 1500,
      easing: 'ease-out',
      fill: 'forwards'
    }).onfinish = () => {
      setTimeout(() => {
        particles.remove();
      }, 100);
    };
  };
  
  fadeOut();
}

// Login user
export function login(username: string): ChatUser {
  // Check if username already exists
  let existingUser = users.value.find(u => u.username === username);
  
  if (existingUser) {
    // Update existing user
    existingUser.isOnline = true;
    existingUser.lastActive = new Date();
    
    // Emit user status change event
    eventEmitter.emit('userStatusChange', existingUser);
    
    // Update room users
    rooms.value.forEach(room => {
      if (!room.users.find(u => u.id === existingUser!.id)) {
        room.users.push(existingUser!);
      }
    });
    
    // Create status change effect
    createStatusChangeParticle(existingUser.username, true);
    
    return existingUser;
  } else {
    // Create new user
    const newUser: ChatUser = {
      id: generateId(),
      username,
      isOnline: true,
      lastActive: new Date()
    };
    
    // Add to users list
    users.value.push(newUser);
    
    // Add to all rooms
    rooms.value.forEach(room => {
      room.users.push(newUser);
    });
    
    // Emit user joined event
    eventEmitter.emit('userJoined', newUser);
    
    // Add system message
    const message: ChatMessage = {
      id: generateId(),
      userId: 'system',
      username: 'System',
      text: `${username} has joined the chat!`,
      timestamp: new Date()
    };
    
    rooms.value.forEach(room => {
      room.messages.push(message);
    });
    
    // Create status change effect
    createStatusChangeParticle(newUser.username, true);
    
    return newUser;
  }
}

// Logout user
export function logout(userId: string): void {
  const user = users.value.find(u => u.id === userId);
  
  if (user) {
    // Update user status
    user.isOnline = false;
    user.lastActive = new Date();
    
    // Emit user status change event
    eventEmitter.emit('userStatusChange', user);
    
    // Remove from rooms' active users
    rooms.value.forEach(room => {
      const index = room.users.findIndex(u => u.id === userId);
      if (index !== -1) {
        room.users.splice(index, 1);
      }
    });
    
    // Add system message
    const message: ChatMessage = {
      id: generateId(),
      userId: 'system',
      username: 'System',
      text: `${user.username} has left the chat.`,
      timestamp: new Date()
    };
    
    rooms.value.forEach(room => {
      room.messages.push(message);
    });
    
    // Create status change effect
    createStatusChangeParticle(user.username, false);
  }
}

// Send message
export function sendMessage(userId: string, text: string): ChatMessage {
  const user = users.value.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Update last active time
  user.lastActive = new Date();
  
  // Create new message
  const message: ChatMessage = {
    id: generateId(),
    userId,
    username: user.username,
    text,
    timestamp: new Date()
  };
  
  // Add to all rooms for simplicity (in real app we would target specific room)
  rooms.value.forEach(room => {
    room.messages.push(message);
    
    // Limit messages to last 100
    if (room.messages.length > 100) {
      room.messages.shift();
    }
  });
  
  // Emit message event
  eventEmitter.emit('message', message);
  
  return message;
}

// Get messages from history
export function getMessages(roomId: string = 'general', limit: number = 20): ChatMessage[] {
  const room = rooms.value.find(r => r.id === roomId);
  if (!room) return [];
  
  // Get last messages up to limit
  return [...room.messages].slice(-limit).sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

// Get online users
export function getOnlineUsers(roomId: string = 'general'): ChatUser[] {
  const room = rooms.value.find(r => r.id === roomId);
  if (!room) return [];
  
  return [...users.value];
}

// Add event listener
export function on(event: string, callback: (data: any) => void): () => void {
  eventEmitter.on(event, callback);
  return () => {
    eventEmitter.off(event, callback);
  };
}

// Randomly generate user status change
setInterval(() => {
  // Randomly select a user to change status
  const randomIndex = Math.floor(Math.random() * users.value.length);
  if (randomIndex > 0) { // Avoid system user
    const user = users.value[randomIndex];
    user.isOnline = !user.isOnline;
    user.lastActive = new Date();
    
    if (user.isOnline) {
      // If online, add to chat room
      if (!generalRoom.users.some(u => u.id === user.id)) {
        generalRoom.users.push(user);
      }
      
      const loginMessage: ChatMessage = {
        id: generateId(),
        userId: 'system',
        username: 'System',
        text: `${user.username} is online`,
        timestamp: new Date()
      };
      
      generalRoom.messages.push(loginMessage);
      eventEmitter.emit('message', loginMessage);
      
      // Create status change effect
      createStatusChangeParticle(user.username, true);
    } else {
      // If offline, remove from chat room
      const roomIndex = generalRoom.users.findIndex(u => u.id === user.id);
      if (roomIndex >= 0) {
        generalRoom.users.splice(roomIndex, 1);
      }
      
      const logoutMessage: ChatMessage = {
        id: generateId(),
        userId: 'system',
        username: 'System',
        text: `${user.username} has left the chat`,
        timestamp: new Date()
      };
      
      generalRoom.messages.push(logoutMessage);
      eventEmitter.emit('message', logoutMessage);
      
      // Create status change effect
      createStatusChangeParticle(user.username, false);
    }
    
    eventEmitter.emit('userStatusChange', user);
  }
}, 60000); // Possible status change every minute

// Randomly generate chat messages
setInterval(() => {
  if (Math.random() > 0.8) { // 20% chance of new message instead of 50%
    const onlineUsers = users.value.filter(u => u.isOnline && u.id !== 'system');
    if (onlineUsers.length > 0) {
      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
      const botMessages = [
        'Does anyone know when the next Happy Ghast update will be released?',
        'Just found a huge ancient city in the deep dark! The loot is amazing!',
        'Anyone want to team up to defeat the Ender Dragon with the new weapons?',
        'The graphics in Happy Ghast with RTX enabled are simply incredible',
        'I think new boss mobs will be added in the next update, maybe a corrupted ghast?',
        'Can anyone share some building tips for the new glass types?',
        'Today the server is really slow, anyone else experiencing lag when breaking blocks?',
        'Just discovered a super cool easter egg in the ocean monument!',
        'My rare item collection is finally complete, so happy I found that last ghast tear!',
        'The new Happy Ghast character skins are too good to pass up, I had to buy them all'
      ];
      
      const message: ChatMessage = {
        id: generateId(),
        userId: randomUser.id,
        username: randomUser.username,
        text: botMessages[Math.floor(Math.random() * botMessages.length)],
        timestamp: new Date()
      };
      
      generalRoom.messages.push(message);
      eventEmitter.emit('message', message);
    }
  }
}, 300000); // Changed from 60000 (1 minute) to 5 minutes 