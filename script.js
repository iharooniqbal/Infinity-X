// ========================== 
// CUSTOM CURSOR SMOOTH ANIMATION
// ==========================
const cursor = document.querySelector('.cursor');
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (cursor) {
  if (isMobile) {
    cursor.style.display = 'none'; // Hide cursor on touch devices
  } else {
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

    const hoverTargets = document.querySelectorAll('a, .btn, .card, .contact-form button');
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

// ==========================
// THREE.JS 3D BACKGROUND
// ==========================
const container = document.getElementById('three-container');
if (container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Adjust particle/cube count for mobile
  const particleCount = isMobile ? 50 : 200;
  const cubeCount = isMobile ? 3 : 10;

  // Particles
  const particles = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < particleCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200
    );
  }
  particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 1.5,
    transparent: true,
    opacity: 0.8
  });
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Floating Cubes
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff00c8,
    transparent: true,
    opacity: 0.4
  });
  const cubes = [];
  for (let i = 0; i < cubeCount; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    cubes.push(cube);
    scene.add(cube);
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x00f5ff, 1, 500);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate particle system
    particleSystem.rotation.y += 0.0005;
    particleSystem.rotation.x += 0.0005;

    // Rotate cubes slowly
    cubes.forEach(c => {
      c.rotation.x += 0.001;
      c.rotation.y += 0.002;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}