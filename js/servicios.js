const serviceData = {
    webapp: {
      title: "Aplicaciones y sistemas web a medida",
      description:
        "Pensado para negocios, emprendimientos o proyectos que necesitan una herramienta web funcional y adaptada a una necesidad real. No se trata solo de mostrar información, sino de resolver procesos, ordenar tareas y mejorar la operación con una solución hecha a medida.",
      items: [
        "Paneles administrativos",
        "Sistemas de reservas o turnos",
        "Gestión interna de datos",
        "Carga y consulta de información",
        "Procesos personalizados",
        "Escalable según el proyecto"
      ]
    },
    landing: {
      title: "Landing pages",
      description:
        "Ideal para campañas, marcas personales, servicios o negocios que necesitan una página clara, visual y enfocada en captar atención. La estructura está pensada para que el usuario entienda rápido la propuesta y tenga una acción concreta para contactarte.",
      items: [
        "Diseño visual impactante",
        "Secciones claras y ordenadas",
        "Llamados a la acción",
        "Enfoque en conversión",
        "Presentación profesional",
        "Adaptación a celulares"
      ]
    },
    business: {
      title: "Páginas web para negocios",
      description:
        "Una opción ideal para empresas, locales, profesionales o marcas que necesitan presencia digital seria y bien presentada. Sirve para mostrar servicios, generar confianza y dar una imagen profesional frente a potenciales clientes.",
      items: [
        "Presentación de servicios",
        "Sección de contacto",
        "Imagen de marca profesional",
        "Información organizada",
        "Navegación clara",
        "Base sólida para crecer"
      ]
    },
    ecommerce: {
      title: "Tiendas online",
      description:
        "Pensado para proyectos que necesitan exhibir productos de forma atractiva y facilitar el proceso de compra. La idea es combinar una buena experiencia visual con una estructura cómoda para mostrar catálogos y vender online.",
      items: [
        "Catálogo de productos",
        "Fichas visuales",
        "Organización por categorías",
        "Experiencia visual moderna",
        "Base para venta online",
        "Escalable según necesidad"
      ]
    },
    maintenance: {
      title: "Mantenimiento web",
      description:
        "Si ya tenés una web o sistema y necesitás mejorarlo, actualizarlo o corregir detalles, este servicio sirve para mantener una presencia digital prolija, funcional y al día.",
      items: [
        "Corrección de errores",
        "Mejoras visuales",
        "Actualización de contenido",
        "Optimización general",
        "Ajustes funcionales",
        "Soporte sobre lo existente"
      ]
    },
    custom: {
      title: "Soluciones personalizadas",
      description:
        "Cuando una idea no entra en un formato estándar, se puede definir una solución digital completamente pensada para ese caso. El foco está en entender la necesidad y plantear algo que tenga sentido real para el proyecto.",
      items: [
        "Definición según objetivos",
        "Enfoque flexible",
        "Estructura a medida",
        "Experiencia personalizada",
        "Pensado para crecer",
        "Orientado a resultados"
      ]
    }
  };
  
  const serviceModal = document.getElementById("serviceModal");
  const serviceModalPanel = document.getElementById("serviceModalPanel");
  const closeServiceModal = document.getElementById("closeServiceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalList = document.getElementById("modalList");
  const serviceButtons = document.querySelectorAll(".service-open");
  
  function renderModalContent(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;
  
    modalTitle.textContent = service.title;
    modalDescription.textContent = service.description;
  
    modalList.innerHTML = "";
  
    service.items.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200";
      li.textContent = item;
      modalList.appendChild(li);
    });
  }
  
  function openServiceModal(serviceKey) {
    renderModalContent(serviceKey);
  
    serviceModal.classList.remove("opacity-0", "pointer-events-none");
    serviceModal.classList.add("opacity-100");
  
    serviceModalPanel.classList.remove("scale-95");
    serviceModalPanel.classList.add("scale-100");
  }
  
  function closeModal() {
    serviceModal.classList.remove("opacity-100");
    serviceModal.classList.add("opacity-0", "pointer-events-none");
  
    serviceModalPanel.classList.remove("scale-100");
    serviceModalPanel.classList.add("scale-95");
  }
  
  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceKey = button.dataset.service;
      openServiceModal(serviceKey);
    });
  });
  
  if (closeServiceModal) {
    closeServiceModal.addEventListener("click", closeModal);
  }
  
  if (serviceModal) {
    serviceModal.addEventListener("click", (e) => {
      if (e.target === serviceModal) {
        closeModal();
      }
    });
  }
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });