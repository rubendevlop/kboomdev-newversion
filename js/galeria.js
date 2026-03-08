// ================================
// DATA DE PROYECTOS
// ================================

const projectData = {
  project1: {
    title: "Nicosia y Nicosia",
    description:
      "Sitio web profesional para una empresa de servicios de construcción, electricidad y grúas con camiones, diseñado para mostrar servicios, generar confianza y facilitar el contacto con clientes.",
    items: [
      "Servicios de construcción",
      "Instalaciones eléctricas",
      "Grúas con camiones",
      "Presentación de proyectos",
      "Contacto directo con clientes",
      "Diseño optimizado para móviles"
    ],
    link: "https://nicosiaynicosia-sh.com"
  },
  
    project2: {
      title: "Estudio ARQ",
      description:
        "Landing page desarrollada para un estudio de arquitectura, enfocada en mostrar proyectos, servicios y transmitir una imagen profesional y moderna.",
      items: [
        "Presentación de proyectos",
        "Sección de servicios",
        "Diseño visual moderno",
        "Imagen profesional del estudio",
        "Optimizada para dispositivos móviles",
        "Contacto directo con clientes"
      ],
      link: "https://estudioarq.netlify.app"
    },

    project3: {
      title: "Panadería Delicias Tuc",
      description:
        "Landing page desarrollada para una panadería artesanal de Tucumán. Presenta productos, información del local y contacto rápido para atraer nuevos clientes.",
      items: [
        "Diseño visual atractivo",
        "Sección de productos",
        "Información del local",
        "Optimizada para móviles",
        "Contacto rápido con clientes",
        "Estructura clara para negocios"
      ],
      link: "https://panaderia-delicias-tuc.netlify.app"
    },
  
    project4: {
      title: "Ferretería El Tornillo",
      description:
        "Tienda online desarrollada para una ferretería, diseñada para mostrar herramientas y productos de forma ordenada, facilitando la búsqueda y la compra de los clientes.",
      items: [
        "Catálogo de herramientas y productos",
        "Organización por categorías",
        "Fichas de productos detalladas",
        "Diseño optimizado para ventas",
        "Experiencia responsive",
        "Contacto y consulta de productos"
      ],
      link: "https://ferreteriaeltornillo.netlify.app"
    },
  
  
  };
  
  
  // ================================
  // ELEMENTOS DEL MODAL
  // ================================
  
  const projectModal = document.getElementById("projectModal");
  const projectModalPanel = document.getElementById("projectModalPanel");
  
  const closeProjectModal = document.getElementById("closeProjectModal");
  
  const projectModalTitle = document.getElementById("projectModalTitle");
  const projectModalDescription = document.getElementById("projectModalDescription");
  const projectModalList = document.getElementById("projectModalList");
  const projectModalLink = document.getElementById("projectModalLink");
  
  const projectButtons = document.querySelectorAll(".project-open");
  
  
  // ================================
  // RENDERIZAR CONTENIDO DEL MODAL
  // ================================
  
  function renderProjectModal(projectKey) {
  
    const project = projectData[projectKey];
  
    if (!project) return;
  
    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;
  
    projectModalLink.href = project.link;
  
    projectModalList.innerHTML = "";
  
    project.items.forEach((item) => {
  
      const li = document.createElement("li");
  
      li.className =
        "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200";
  
      li.textContent = item;
  
      projectModalList.appendChild(li);
  
    });
  
  }
  
  
  // ================================
  // ABRIR MODAL
  // ================================
  
  function openProjectModal(projectKey) {
  
    renderProjectModal(projectKey);
  
    projectModal.classList.remove("opacity-0", "pointer-events-none");
    projectModal.classList.add("opacity-100");
  
    projectModalPanel.classList.remove("scale-95");
    projectModalPanel.classList.add("scale-100");
  
  }
  
  
  // ================================
  // CERRAR MODAL
  // ================================
  
  function closeModal() {
  
    projectModal.classList.remove("opacity-100");
    projectModal.classList.add("opacity-0", "pointer-events-none");
  
    projectModalPanel.classList.remove("scale-100");
    projectModalPanel.classList.add("scale-95");
  
  }
  
  
  // ================================
  // BOTONES DE PROYECTO
  // ================================
  
  projectButtons.forEach((button) => {
  
    button.addEventListener("click", () => {
  
      const projectKey = button.dataset.project;
  
      openProjectModal(projectKey);
  
    });
  
  });
  
  
  // ================================
  // BOTÓN CERRAR
  // ================================
  
  if (closeProjectModal) {
    closeProjectModal.addEventListener("click", closeModal);
  }
  
  
  // ================================
  // CLICK FUERA DEL MODAL
  // ================================
  
  if (projectModal) {
  
    projectModal.addEventListener("click", (e) => {
  
      if (e.target === projectModal) {
        closeModal();
      }
  
    });
  
  }
  
  
  // ================================
  // CERRAR CON ESC
  // ================================
  
  document.addEventListener("keydown", (e) => {
  
    if (e.key === "Escape") {
      closeModal();
    }
  
  });