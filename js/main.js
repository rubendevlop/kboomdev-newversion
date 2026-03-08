// ================================
// MENÚ MOBILE
// ================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}


// ================================
// NAVBAR EFECTO SCROLL
// ================================

const header = document.getElementById("header");

function handleNavbarScroll() {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("shadow-lg");
    header.classList.add("bg-black/70");
  } else {
    header.classList.remove("shadow-lg");
    header.classList.remove("bg-black/70");
  }
}

window.addEventListener("scroll", handleNavbarScroll);


// ================================
// ANIMACIONES AL APARECER
// ================================

const revealElements = document.querySelectorAll(
  "#heroText, #heroVisual, #quickSection"
);

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.remove("opacity-0");
      element.classList.remove("translate-y-8");

      element.classList.add("opacity-100");
      element.classList.add("translate-y-0");
      element.classList.add("transition");
      element.classList.add("duration-700");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ================================
// CERRAR MENÚ MOBILE AL HACER CLICK
// ================================

const mobileLinks = document.querySelectorAll("#mobileMenu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});