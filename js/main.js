// JavaScript Preloader, Typewriter, Profile Slideshow, Accordion, Hamburger Navigation, and Scroll Glow Observer Logic

document.addEventListener("DOMContentLoaded", () => {
  // 1. Preloader and Loading Progress
  const progressBar = document.getElementById("progress-bar");
  const percentageText = document.getElementById("percentage");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 5;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        if (preloader) preloader.classList.add("fade-out");
        if (mainContent) mainContent.classList.add("visible");
      }, 300);
    }

    if (progressBar && percentageText) {
      progressBar.style.width = `${progress}%`;
      percentageText.textContent = `${progress}%`;
    }
  }, 100);

  // 2. Typewriter Effect for Hero Subtitle
  const words = [
    "ERP Techno-Functional Consultant",
    "Dynamics 365 Business Central Specialist",
    "Sage Intacct Functional Consultant"
  ];
  
  let timer;
  const speed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;
  const targetElement = document.getElementById("typed-text");

  if (targetElement) {
    function typeWriter(wordIndex, charIndex, isDeleting) {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        timer = setTimeout(() => typeWriter(wordIndex, charIndex - 1, true), deletingSpeed);
      } else {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        timer = setTimeout(() => typeWriter(wordIndex, charIndex + 1, false), speed);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        clearTimeout(timer);
        setTimeout(() => typeWriter(wordIndex, currentWord.length, true), delayBetweenWords);
      } else if (isDeleting && charIndex === 0) {
        clearTimeout(timer);
        const nextWordIndex = (wordIndex + 1) % words.length;
        setTimeout(() => typeWriter(nextWordIndex, 0, false), 500);
      }
    }

    typeWriter(0, 0, false);
  }

  // 3. Profile Image Slideshow Effect
  const profileImages = document.querySelectorAll('.image-frame-inner .profile-img');
  if (profileImages.length > 1) {
    let currentImgIndex = 0;
    setInterval(() => {
      profileImages[currentImgIndex].classList.remove('active');
      currentImgIndex = (currentImgIndex + 1) % profileImages.length;
      profileImages[currentImgIndex].classList.add('active');
    }, 3500);
  }

  // 4. Exclusive Accordion Toggle for Employment Timeline
  const accordionCards = document.querySelectorAll('.timeline-accordion-card');

  accordionCards.forEach(card => {
    card.addEventListener('click', () => {
      const isCurrentlyOpen = card.classList.contains('open');
      if (isCurrentlyOpen) return;

      accordionCards.forEach(otherCard => {
        otherCard.classList.remove('open', 'active-orange-border');
        const otherMarker = otherCard.parentElement.querySelector('.timeline-square-marker');
        const otherToggle = otherCard.querySelector('.toggle-icon');
        
        if (otherMarker) otherMarker.classList.remove('active-marker');
        if (otherToggle) otherToggle.textContent = '[+]';
      });

      card.classList.add('open', 'active-orange-border');
      const currentMarker = card.parentElement.querySelector('.timeline-square-marker');
      const currentToggle = card.querySelector('.toggle-icon');

      if (currentMarker) currentMarker.classList.add('active-marker');
      if (currentToggle) currentToggle.textContent = '[-]';
    });
  });

  // 5. Mobile Hamburger Navigation Toggle & Outside Click Handler
  const hamburger = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('nav-active');
      document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('nav-active')) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('nav-active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // 6. Mobile Scroll Center-Glow Observer (Illuminates cards when they reach the middle of the screen)
  // 6. Mobile Scroll Center-Glow Observer
  const scrollCards = document.querySelectorAll('.work-card, .timeline-accordion-card, .archive-card, .project-card, .glass-card');

  if ('IntersectionObserver' in window && scrollCards.length > 0) {
    const observerOptions = {
      root: null,
      // Adjusted margin to 15% so large cards trigger glow smoothly on mobile screen height
      rootMargin: '-15% 0px -15% 0px',
      threshold: 0.15
    };

    const centerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    scrollCards.forEach(card => centerObserver.observe(card));
  }
});