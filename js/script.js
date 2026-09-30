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

// Intersection Observer for skills section (disabled since Skills section is now in Tech Stack tab)
// const skillsSection = document.querySelector('.skills');
// if (skillsSection) {
//   const skillsObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateSkillTags();
//       } else {
//         resetSkillTags();
//       }
//     });
//   }, {
//     threshold: 0.3
//   });
//
//   skillsObserver.observe(skillsSection);
// }

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
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/andzanimavangwa88@gmail.com';
  try {
    const res = await fetch(FORM_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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

  } catch (error) {
    console.error('Critical page initialization error:', error);
    // Ensure page remains functional even with errors
    document.body.style.visibility = 'visible';
  }
});

// Tab switching functionality for portfolio showcase - run outside try-catch
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        // Show the selected tab content
        const tabId = this.getAttribute('data-tab');
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add('active');
          
          // Animate skill tags when Tech Stack tab is opened
          if (tabId === 'techstack') {
            resetSkillTags();
            setTimeout(() => {
              animateSkillTags();
            }, 100);
          }
        }
      });
    });
  }
});

