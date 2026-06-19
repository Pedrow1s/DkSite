document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLLING ---
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Fechar menu quando clica em algum link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // --- REVEAL ANIMATIONS ON SCROLL ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (revealElements.length > 0) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Deixa de observar para manter animado
        }
      });
    }, {
      threshold: 0.15, // Gatilho quando 15% do elemento estiver visível
      rootMargin: "0px 0px -50px 0px" // Ajuste para celular/desktop
    });

    revealElements.forEach(el => revealOnScroll.observe(el));
  }

  // --- MENU MARCAR LINK ATIVO BASEADO NA PÁGINA ATUAL ---
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
