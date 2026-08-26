// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const savedTheme = localStorage.getItem("theme") || "dark";
htmlElement.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Typing effect
const roles = ["Full Stack Developer", " Python Developer", "Flutter Developer"];
const textElement = document.getElementById("typingText");
let roleIndex = 0, charIndex = 0, typingSpeed = 100, deletingSpeed = 50, isDeleting = false;
function typeEffect() {
  try {
    if (!textElement) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      textElement.textContent = "I am a " + currentRole.substring(0, charIndex);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, deletingSpeed);
      }
    } else {
      charIndex++;
      textElement.textContent = "I am a " + currentRole.substring(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
      } else {
        setTimeout(typeEffect, typingSpeed);
      }
    }
  } catch (error) {
    console.error('TypeEffect error:', error);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

// Active page indicator
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
}

// Scroll animation elements
const aboutImage = document.querySelector('.about-image');
const aboutText = document.querySelector('.about-text');
const servicesContent = document.querySelector('.services-content');
const skillsContent = document.querySelector('.skills-content');
const projectsContent = document.querySelector('.projects-content');
const contactContent = document.querySelector('.contact-content');

// Skills collision animation
function animateSkillTags() {
  const leftTags = document.querySelectorAll('.skills-left .skill-tag');
  const rightTags = document.querySelectorAll('.skills-right .skill-tag');
  
  // Animate left column tags with staggered delay
  leftTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.classList.add('animate');
    }, index * 80); //
  });
  
  // Animate right column tags with staggered delay
  rightTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.classList.add('animate');
    }, index * 80); // 80ms stagger delay for smoother animation
  });
}

function resetSkillTags() {
  const allTags = document.querySelectorAll('.skill-tag');
  allTags.forEach(tag => {
    tag.classList.remove('animate');
  });
}

// Combined scroll handler
function handleScroll() {
  updateActiveNav();
  toggleBackToTop();
  
  const triggerBottom = window.innerHeight * 0.85;

  // About section animation
  if (aboutText) {
    const aboutPos = aboutText.getBoundingClientRect().top;
    if (aboutPos < triggerBottom) {
      aboutImage.classList.add('active');
      aboutText.classList.add('active');
    } else {
      aboutImage.classList.remove('active');
      aboutText.classList.remove('active');
    }
  }

  // Services section scroll animation
  if (servicesContent) {
    const servicesPos = servicesContent.getBoundingClientRect().top;
    if (servicesPos < triggerBottom) {
      servicesContent.classList.add('active');
    } else {
      servicesContent.classList.remove('active');
    }
  }

  // Skills section scroll animation
  if (skillsContent) {
    const skillsPos = skillsContent.getBoundingClientRect().top;
    if (skillsPos < triggerBottom) {
      skillsContent.classList.add('active');
    } else {
      skillsContent.classList.remove('active');
    }
  }

  // Projects section scroll animation
  if (projectsContent) {
    const projectsPos = document.querySelector('.projects').getBoundingClientRect().top;
    if (projectsPos < triggerBottom) {
      projectsContent.classList.add('active');
    } else {
      projectsContent.classList.remove('active');
    }
  }

  // Contact section scroll animation
  if (contactContent) {
    const contactPos = document.querySelector('.contact').getBoundingClientRect().top;
    if (contactPos < triggerBottom) {
      contactContent.classList.add('active');
    } else {
      contactContent.classList.remove('active');
    }
  }
}

window.addEventListener('scroll', handleScroll);

// Intersection Observer for skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillTags();
      } else {
        resetSkillTags();
      }
    });
  }, {
    threshold: 0.3
  });
  
  skillsObserver.observe(skillsSection);
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  const WEBHOOK_URL = 'PASTE_YOUR_MAKE_WEBHOOK_URL_HERE';
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Request failed');
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  } catch (err) {
    alert('Sorry, there was a problem sending your message. Please try again later.');
  }
});

// Footer: dynamic year and back-to-top visibility
const yearEl = document.getElementById('year');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

const backToTop = document.getElementById('backToTop');
function toggleBackToTop() {
  if (!backToTop) return;
  const show = window.scrollY > 400;
  backToTop.style.opacity = show ? '1' : '0';
  backToTop.style.pointerEvents = show ? 'auto' : 'none';
}
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Initial call
  toggleBackToTop();
}

// Prevent default for placeholder links
document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    }
  });
}

// ===== RUN WHEN PAGE LOADS =====
document.addEventListener('DOMContentLoaded', function () {
  try {
    // Ensure body is visible on page load
    document.body.style.visibility = 'visible';

    // Initialize other page functionality
    handleScroll();

    // Initialize neural network animation
    initNetworkAnimation();

  } catch (error) {
    console.error('Critical page initialization error:', error);
    // Ensure page remains functional even with errors
    document.body.style.visibility = 'visible';
  }
});

// ===== NEURAL NETWORK ANIMATION =====
function initNetworkAnimation() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  // Resize canvas to full window
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // 3D perspective settings
  const focalLength = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  // Dot configuration
  const dots = [];
  const numDots = 15;
  const cyanColor = '#00d4ff';

  // Initialize dots with random 3D positions
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * 500 - 250,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.3,
      radius: 1 + Math.random() * 1.5
    });
  }

  // Project 3D to 2D
  function project(dot) {
    const scale = focalLength / (focalLength + dot.z);
    return {
      x: dot.x * scale + centerX,
      y: dot.y * scale + centerY,
      scale: scale,
      opacity: Math.max(0.2, Math.min(1, scale))
    };
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw dots
    const projectedDots = dots.map(dot => {
      // Update 3D position
      dot.x += dot.vx;
      dot.y += dot.vy;
      dot.z += dot.vz;

      // Bounce off 3D boundaries - expanded for full page coverage
      if (Math.abs(dot.x) > width * 0.6) dot.vx *= -1;
      if (Math.abs(dot.y) > height * 0.6) dot.vy *= -1;
      if (dot.z < -250 || dot.z > 250) dot.vz *= -1;

      // Project to 2D
      const projected = project(dot);

      return {
        ...projected,
        radius: dot.radius,
        dot: dot
      };
    });

    // Sort by z-depth for proper rendering order
    projectedDots.sort((a, b) => a.dot.z - b.dot.z);

    // Draw connections between dots (behind dots)
    for (let i = 0; i < projectedDots.length; i++) {
      for (let j = i + 1; j < projectedDots.length; j++) {
        const dx = projectedDots[j].x - projectedDots[i].x;
        const dy = projectedDots[j].y - projectedDots[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.min(width, height) * 0.35;

        if (distance < maxDistance) {
          // Calculate line opacity based on distance and depth
          const distanceOpacity = 1 - (distance / maxDistance);
          const depthOpacity = (projectedDots[i].opacity + projectedDots[j].opacity) / 2;
          const lineOpacity = distanceOpacity * depthOpacity;

          // Draw line with gradient
          const gradient = ctx.createLinearGradient(
            projectedDots[i].x, projectedDots[i].y,
            projectedDots[j].x, projectedDots[j].y
          );
          gradient.addColorStop(0, `rgba(0, 212, 255, 0)`);
          gradient.addColorStop(0.2, `rgba(0, 212, 255, ${lineOpacity})`);
          gradient.addColorStop(0.5, `rgba(0, 212, 255, ${lineOpacity * 1.2})`);
          gradient.addColorStop(0.8, `rgba(0, 212, 255, ${lineOpacity})`);
          gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);

          ctx.beginPath();
          ctx.moveTo(projectedDots[i].x, projectedDots[i].y);
          ctx.lineTo(projectedDots[j].x, projectedDots[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 * ((projectedDots[i].scale + projectedDots[j].scale) / 2);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    projectedDots.forEach(p => {
      const scaledRadius = p.radius * p.scale;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, scaledRadius, 0, Math.PI * 2);
      ctx.fillStyle = cyanColor;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}
