// ================================
// DATA DE PROYECTOS
// ================================

const projectData = {
    project1: {
      title: "Proyecto Prisma",
      description:
        "Landing page moderna diseñada para presentar una marca profesional con una estética visual fuerte y una estructura pensada para captar atención.",
      items: [
        "Diseño visual moderno",
        "Secciones claras",
        "Hero impactante",
        "Optimización visual",
        "Experiencia responsive",
        "Enfoque en conversión"
      ],
      link: "#"
    },
  
    project2: {
      title: "Proyecto Nova",
      description:
        "Sitio web institucional pensado para empresas o profesionales que necesitan transmitir confianza y mostrar servicios de forma clara.",
      items: [
        "Presentación de servicios",
        "Imagen profesional",
        "Sección contacto",
        "Diseño moderno",
        "Estructura clara",
        "Experiencia responsive"
      ],
      link: "#"
    },
  
    project3: {
      title: "Proyecto Control",
      description:
        "Aplicación web orientada a procesos internos y gestión de información para organizar tareas y datos.",
      items: [
        "Panel administrativo",
        "Gestión de datos",
        "Interfaz funcional",
        "Estructura escalable",
        "Experiencia clara",
        "Organización de procesos"
      ],
      link: "#"
    },
  
    project4: {
      title: "Proyecto Store",
      description:
        "E-commerce visualmente atractivo diseñado para mostrar productos de forma ordenada y facilitar la experiencia de compra.",
      items: [
        "Catálogo de productos",
        "Fichas visuales",
        "Organización por categorías",
        "Experiencia visual moderna",
        "Diseño orientado a ventas",
        "Escalable"
      ],
      link: "#"
    },
  
    project5: {
      title: "Proyecto Impacto",
      description:
        "Landing page enfocada en captar atención rápidamente con una propuesta clara y visualmente potente.",
      items: [
        "Diseño visual fuerte",
        "Mensaje claro",
        "Estructura de conversión",
        "Experiencia responsive",
        "Optimización visual",
        "Secciones estratégicas"
      ],
      link: "#"
    },
  
    project6: {
      title: "Proyecto Gestión",
      description:
        "Sistema web orientado a organizar procesos internos, datos y tareas de forma clara y funcional.",
      items: [
        "Sistema administrativo",
        "Gestión de información",
        "Interfaz clara",
        "Organización de procesos",
        "Escalabilidad",
        "Experiencia funcional"
      ],
      link: "#"
    }
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