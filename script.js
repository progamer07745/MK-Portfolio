// ========== TYPING EFFECT ==========
const typingElement = document.getElementById("typing-line");
const phrases = [
  ".NET Backend Engineer",
  "Graphic Designer",
  "API Specialist",
  "Branding Expert",
  "Problem Solver",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

typeEffect();

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ========== GLIGHTBOX INIT ==========
const lightbox = GLightbox({
  selector: ".glightbox",
  touchNavigation: true,
  loop: true,
  zoomable: true,
  draggable: true,
  openEffect: "zoom",
  closeEffect: "fade",
  slideEffect: "slide",
});

// ========== DESIGN FILTERS ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const graphicCards = document.querySelectorAll(".graphic-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    graphicCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ========== CERTIFICATE VIEW BUTTONS ==========
const viewButtons = document.querySelectorAll(".view-btn");
viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const imgSrc = button.getAttribute("data-src");
    if (imgSrc) {
      // Create a glightbox instance for the certificate
      const certLightbox = GLightbox({
        elements: [
          {
            href: imgSrc,
            type: "image",
            title: "Certificate",
            description: "",
          },
        ],
      });
      certLightbox.open();
    }
  });
});

// ========== COUNT UP ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll(".count");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute("data-target"));
      const count = parseInt(counter.innerText);
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = Math.min(count + increment, target);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    // Start counter when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCount();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
}

animateCounters();

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========== ADD SOME RANDOM FLOATING ICONS ==========
const floatingIconsContainer = document.getElementById("floatingIcons");
if (floatingIconsContainer) {
  const icons = [
    "fa-code",
    "fa-paint-brush",
    "fa-database",
    "fa-palette",
    "fa-cloud",
    "fa-mobile-alt",
  ];
  for (let i = 0; i < 5; i++) {
    const icon = document.createElement("i");
    icon.className = `fas ${icons[Math.floor(Math.random() * icons.length)]} floating-icon`;
    icon.style.position = "absolute";
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.fontSize = `${Math.random() * 20 + 10}px`;
    icon.style.color = "#5ef0ff";
    icon.style.opacity = "0.1";
    icon.style.transform = `rotate(${Math.random() * 360}deg)`;
    icon.style.animation = `floatIcon ${Math.random() * 5 + 3}s ease-in-out infinite`;
    floatingIconsContainer.appendChild(icon);
  }
}
