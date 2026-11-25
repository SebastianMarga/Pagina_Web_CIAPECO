// js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedorNavbar = document.getElementById("navbar-container");

  if (contenedorNavbar) {
    fetch("navbar.html")
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el navbar");
        return response.text();
      })
      .then((data) => {
        contenedorNavbar.innerHTML = data;

        // 1. Marcar enlace activo según la página actual
        const paginaActual =
          window.location.pathname.split("/").pop() || "index.html";
        const enlaces = contenedorNavbar.querySelectorAll(
          ".nav-link, .btn-contacto-nav",
        );

        enlaces.forEach((enlace) => {
          if (enlace.getAttribute("href") === paginaActual) {
            enlace.classList.add("active");
          }
        });

        // 2. Efecto de vidrio esmerilado y compactación al hacer scroll
        const navbar = contenedorNavbar.querySelector(".navbar-custom");

        const manejarScroll = () => {
          if (window.scrollY > 40) {
            navbar.classList.add("navbar-scrolled");
          } else {
            navbar.classList.remove("navbar-scrolled");
          }
        };

        window.addEventListener("scroll", manejarScroll);
        manejarScroll(); // Verifica el estado inicial por si recargan la página a mitad de scroll
      })
      .catch((error) => {
        console.error("Error al cargar la barra de navegación:", error);
      });
  }
});
