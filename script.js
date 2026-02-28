// ==========================
// CUSTOM CURSOR SMOOTH ANIMATION
// ==========================
const cursor = document.querySelector('.cursor');
if (cursor) {
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0, speed = 0.15;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.left = posX + 'px';
    cursor.style.top = posY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, .btn, .card');
  hoverTargets.forEach(el => {
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
}

// ==========================
// HAMBURGER MENU TOGGLE
// ==========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ==========================
// HEADER SCROLL EFFECT
// ==========================
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}