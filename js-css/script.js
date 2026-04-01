const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

const showcaseRow = document.getElementById("showcaseRow");
const carousel = document.getElementById("carousel");

/* ========
   TEMA
   ======== */
function updateThemeIcon() {
  if (!themeIcon) return;

  if (document.body.classList.contains("light-mode")) {
    themeIcon.textContent = "🌙";
  } else {
    themeIcon.textContent = "🔥";
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }

  updateThemeIcon();
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    updateThemeIcon();
  });
}

/* ==============
   MENU MOBILE
   ============== */
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && window.innerWidth <= 760) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ======================
   CARROSSEL AUTOMÁTICO
   ====================== */
if (carousel && showcaseRow && !showcaseRow.dataset.cloned) {
  const cards = Array.from(showcaseRow.children);

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    showcaseRow.appendChild(clone);
  });

  showcaseRow.dataset.cloned = "true";

  let scrollSpeed = 0.5;
  let animationId = null;

  function autoScrollCarousel() {
    carousel.scrollLeft += scrollSpeed;

    if (carousel.scrollLeft >= showcaseRow.scrollWidth / 2) {
      carousel.scrollLeft = 0;
    }

    animationId = requestAnimationFrame(autoScrollCarousel);
  }

  function startCarousel() {
    if (!animationId) {
      animationId = requestAnimationFrame(autoScrollCarousel);
    }
  }

  function stopCarousel() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  carousel.addEventListener("mouseenter", stopCarousel);
  carousel.addEventListener("mouseleave", startCarousel);

  carousel.addEventListener("touchstart", stopCarousel, { passive: true });
  carousel.addEventListener("touchend", startCarousel);

  startCarousel();
}

/* ==============
   INICIALIZAÇÃO
   ============== */
document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
});