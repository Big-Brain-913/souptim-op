// Audio handling
const bgm = document.getElementById('bgm');
const clickSound = document.getElementById('clickSound');
const hoverSound = document.getElementById('hoverSound');
const startBtn = document.getElementById('startBtn');
const loadingScreen = document.getElementById('loadingScreen');
const content = document.getElementById('content');
const toggleBtn = document.getElementById('toggleBgm');

startBtn.addEventListener('click', () => {
  bgm.play().catch((error) => console.warn('BGM play failed:', error));
  loadingScreen.classList.add('hidden');
  content.classList.add('active');
  clickSound.play().catch((error) => console.warn('Click sound failed:', error));
});

toggleBtn.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
  toggleBtn.textContent = bgm.muted ? '🔇' : '🔊';
  clickSound.play().catch((error) => console.warn('Click sound failed:', error));
});
toggleBtn.addEventListener('mouseenter', () => {
  hoverSound.play().catch((error) => console.warn('Hover sound failed:', error));
});

// Card navigation
const cards = document.querySelectorAll('.card');
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    cards.forEach(card => card.classList.add('hidden'));
    document.getElementById(btn.dataset.card).classList.remove('hidden');
    clickSound.play().catch((error) => console.warn('Click sound failed:', error));
  });
  btn.addEventListener('mouseenter', () => {
    hoverSound.play().catch((error) => console.warn('Hover sound failed:', error));
  });
});

// Particle effect (explosion-like)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 8 + 3;
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;
    this.color = `hsl(${Math.random() * 30 + 180}, 80%, 60%)`; // Cyan/teal hues
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.3) this.size -= 0.15;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.3) particles.push(new Particle());
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Autoscroll functionality for Loadouts section
const loadoutsContainer = document.querySelector('.loadouts-container');
let isAutoScrolling = true;
let scrollSpeed = 0.8; // Reduced speed for mobile
let scrollDirection = 1;
let lastScrollTime = 0;
let isMobile = window.innerWidth <= 600;

function autoScroll() {
  if (!isAutoScrolling) return;
  
  const now = Date.now();
  const delay = isMobile ? 80 : 50; // Slower on mobile
  
  if (now - lastScrollTime > delay) {
    const scrollTop = loadoutsContainer.scrollTop;
    const scrollHeight = loadoutsContainer.scrollHeight;
    const clientHeight = loadoutsContainer.clientHeight;
    
    if (scrollTop >= scrollHeight - clientHeight - 10) {
      scrollDirection = -1; // Reverse direction
    } else if (scrollTop <= 10) {
      scrollDirection = 1; // Forward direction
    }
    
    loadoutsContainer.scrollTop += scrollSpeed * scrollDirection;
    lastScrollTime = now;
  }
  
  requestAnimationFrame(autoScroll);
}

// Pause autoscroll on hover (desktop)
if (!isMobile) {
  loadoutsContainer.addEventListener('mouseenter', () => {
    isAutoScrolling = false;
  });

  loadoutsContainer.addEventListener('mouseleave', () => {
    isAutoScrolling = true;
  });
}

// Pause autoscroll on touch (mobile)
let touchTimeout;
loadoutsContainer.addEventListener('touchstart', () => {
  isAutoScrolling = false;
  clearTimeout(touchTimeout);
});

loadoutsContainer.addEventListener('touchend', () => {
  touchTimeout = setTimeout(() => {
    isAutoScrolling = true;
  }, 3000); // Longer pause on mobile
});

// Handle window resize
window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 600;
  scrollSpeed = isMobile ? 0.8 : 1;
});

// Start autoscroll after fade-in animation
setTimeout(() => {
  autoScroll();
}, 2000);

// Fade-in animation for Loadouts section
const loadoutsSection = document.getElementById('loadoutsSection');

function checkScroll() {
  const sectionTop = loadoutsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight * 0.8) {
    loadoutsSection.classList.add('fade-in');
  }
}

// Check scroll position on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Add click sound to loadout items
const loadoutItems = document.querySelectorAll('.loadout-item');
loadoutItems.forEach(item => {
  item.addEventListener('click', () => {
    clickSound.play().catch((error) => console.warn('Click sound failed:', error));
  });
});