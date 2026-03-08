// ================================
// MODAL PRESENTACIÓN
// ================================

const openIntroModal = document.getElementById("openIntroModal");
const closeIntroModal = document.getElementById("closeIntroModal");
const introModal = document.getElementById("introModal");
const introModalPanel = document.getElementById("introModalPanel");

function openModal() {
  if (!introModal) return;

  introModal.classList.remove("opacity-0");
  introModal.classList.remove("pointer-events-none");

  introModal.classList.add("opacity-100");

  introModalPanel.classList.remove("scale-95");
  introModalPanel.classList.add("scale-100");
}

function closeModal() {
  if (!introModal) return;

  introModal.classList.remove("opacity-100");
  introModal.classList.add("opacity-0");
  introModal.classList.add("pointer-events-none");

  introModalPanel.classList.remove("scale-100");
  introModalPanel.classList.add("scale-95");
}


// abrir modal
if (openIntroModal) {
  openIntroModal.addEventListener("click", openModal);
}

// cerrar modal
if (closeIntroModal) {
  closeIntroModal.addEventListener("click", closeModal);
}


// ================================
// CERRAR MODAL HACIENDO CLICK FUERA
// ================================

if (introModal) {
  introModal.addEventListener("click", (e) => {

    if (e.target === introModal) {
      closeModal();
    }

  });
}


// ================================
// CERRAR MODAL CON ESC
// ================================

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    closeModal();
  }

});


// ================================
// EFECTO PARALLAX SUAVE HERO
// ================================

const heroSection = document.querySelector("section");

function heroParallax() {

  if (!heroSection) return;

  const scrollY = window.scrollY;

  heroSection.style.transform = `translateY(${scrollY * 0.05}px)`;

}

window.addEventListener("scroll", heroParallax);


// ================================
// EFECTO HOVER SUAVE LOGO
// ================================

const logo = document.querySelector("img[src='assets/logo.png']");

if (logo) {

  logo.addEventListener("mouseenter", () => {
    logo.classList.add("scale-110");
    logo.classList.add("transition");
  });

  logo.addEventListener("mouseleave", () => {
    logo.classList.remove("scale-110");
  });

}