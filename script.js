// ==========================
// CUSTOM CURSOR SMOOTH ANIMATION
// ==========================
const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;
const speed = 0.15; // smaller = slower / more lag

// Track real mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor smoothly
function animateCursor() {
  // interpolate between current pos and mouse pos
  posX += (mouseX - posX) * speed;
  posY += (mouseY - posY) * speed;

  cursor.style.left = posX + 'px';
  cursor.style.top = posY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Optional: hover effect on buttons/links
const hoverTargets = document.querySelectorAll('a, .btn, .card');

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'rgba(0, 245, 255, 0.3)';
    cursor.style.borderColor = '#00f5ff';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
    cursor.style.borderColor = '#00f5ff';
  });
});