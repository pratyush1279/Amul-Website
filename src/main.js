import './style.css';

// Core State Configurations
const totalFrames = 147;
const images = [];
let loadedCount = 0;
let currentFrameIndex = 1;
let targetFrameIndex = 1;
let isPreloaded = false;

// DOM Elements
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const canvas = document.getElementById('animation-canvas');
const context = canvas?.getContext('2d');
const container = document.getElementById('scroll-sequence-container');
// (Timeline markers, Custom cursor, and cursor hover scripts removed as requested)

// Preloading Image Frames
function preloadImages() {
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    const frameNumber = i.toString().padStart(3, '0');
    img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
    img.onload = handleImageLoad;
    img.onerror = () => {
      console.error(`Failed to load frame ${frameNumber}`);
      handleImageLoad(); // Increment anyway to prevent progress freeze
    };
    images.push(img);
  }
}

function handleImageLoad() {
  loadedCount++;
  const percentage = Math.floor((loadedCount / totalFrames) * 100);
  
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (progressText) progressText.textContent = `Churning goodness... ${percentage}%`;

  if (loadedCount === totalFrames) {
    isPreloaded = true;
    setTimeout(() => {
      preloader?.classList.add('loaded');
      document.body.style.overflowY = 'auto';
      initializeScrollAnimation();
    }, 800);
  }
}

// Aspect ratio cover algorithm (CSS object-fit: cover for Canvas)
function drawFrame(frameIndex) {
  const img = images[Math.floor(frameIndex) - 1];
  if (!img || !context || !canvas) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  if (imgWidth === 0 || imgHeight === 0) return;

  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight, drawX, drawY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    drawX = 0;
    drawY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    drawX = (canvasWidth - drawWidth) / 2;
    drawY = 0;
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// Canvas Resizing
function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameIndex);
  }
}

// (Timeline click and update handlers removed as requested)

// Render Loop utilizing requestAnimationFrame inertia
function renderLoop() {
  // Multiplier for scrolling inertia (0.1 means slow and smooth, 1.0 means instant)
  const inertiaFactor = 0.15;
  
  if (Math.abs(currentFrameIndex - targetFrameIndex) > 0.05) {
    currentFrameIndex += (targetFrameIndex - currentFrameIndex) * inertiaFactor;
    drawFrame(currentFrameIndex);
  }
  
  requestAnimationFrame(renderLoop);
}

// Initializing Scroll Metrics and Canvas Event hooks
function initializeScrollAnimation() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const introOverlay = document.getElementById('scroll-intro-overlay');

  // Monitor page scroll positions
  window.addEventListener('scroll', () => {
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const maxScroll = rect.height - window.innerHeight;

    // Calculate scroll progress percentage (from 0 to 1) when scroll is inside canvas area
    let scrollProgress = -rect.top / maxScroll;
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    // Map percentage to target frame index (1 to 147)
    targetFrameIndex = 1 + scrollProgress * (totalFrames - 1);

    // Fade out intro overlay at 30% scroll progress
    if (introOverlay) {
      const fadeEnd = 0.3;
      let opacity = 1 - (scrollProgress / fadeEnd);
      opacity = Math.max(0, Math.min(1, opacity));
      introOverlay.style.opacity = opacity;
      
      let translateY = -(scrollProgress / fadeEnd) * 50;
      introOverlay.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
      
      if (opacity === 0) {
        introOverlay.style.visibility = 'hidden';
      } else {
        introOverlay.style.visibility = 'visible';
      }
    }
  });

  // Start animated frame scrubbing rendering loop
  requestAnimationFrame(renderLoop);
}

// (Topical slide carousel removed as requested)

// Kick off initialization preventing double loading
let preloadingStarted = false;
function initPreload() {
  if (preloadingStarted) return;
  preloadingStarted = true;
  document.body.style.overflowY = 'hidden'; // Hide scroll during load
  preloadImages();
}

document.addEventListener('DOMContentLoaded', initPreload);

// In case DOMContentLoaded already fired before script execution
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initPreload();
}
