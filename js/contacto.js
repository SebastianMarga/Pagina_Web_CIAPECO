// js/contacto.js
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. INICIALIZAR EL MAPA INTERACTIVO AMPLIADO
  // ==========================================
  const contenedorMapa = document.getElementById("mapaInteractivo");

  if (contenedorMapa) {
    const sedes = {
      miraflores: {
        coords: [-12.111687, -77.037849],
        zoom: 16,
        titulo: "Oficina Principal - Ciapeco S.A.C.",
        detalle: "Av. Santa Cruz 875, Miraflores, Lima.",
      },
      chorrillos: {
        coords: [-12.215802, -76.978253],
        zoom: 14,
        titulo: "Almacén de Acopio - Chorrillos",
        detalle: "Recepción y control de lotes minerales en Lima.",
      },
      trujillo: {
        coords: [-8.048395, -79.064623],
        zoom: 13,
        titulo: "Almacén de Acopio - Trujillo",
        detalle: "Acopio estratégico para la zona norte del Perú.",
      },
    };

    const mapa = L.map("mapaInteractivo").setView(
      sedes.miraflores.coords,
      sedes.miraflores.zoom,
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap | Ciapeco S.A.C.",
    }).addTo(mapa);

    const iconoMostaza = L.divIcon({
      className: "custom-pin",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -12],
    });

    const marcadores = {};
    const grupoCoordenadas = [];

    Object.keys(sedes).forEach((clave) => {
      const sede = sedes[clave];
      grupoCoordenadas.push(sede.coords);

      const marker = L.marker(sede.coords, { icon: iconoMostaza }).addTo(mapa);
      marker.bindPopup(`
        <div style="font-family: 'Open Sans', sans-serif; min-width: 190px;">
          <strong style="color: #111111; font-size: 0.95rem;">${sede.titulo}</strong><br>
          <span style="color: #555555; font-size: 0.85rem;">${sede.detalle}</span>
        </div>
      `);
      marcadores[clave] = marker;
    });

    // Abrir popup de la oficina principal al cargar
    marcadores.miraflores.openPopup();

    // Eventos al hacer clic en cada sede del panel izquierdo
    const itemsSede = document.querySelectorAll(".sede-item");
    itemsSede.forEach((item) => {
      item.addEventListener("click", () => {
        itemsSede.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        const claveSede = item.getAttribute("data-sede");
        const destino = sedes[claveSede];

        if (destino) {
          mapa.flyTo(destino.coords, destino.zoom, { duration: 1.2 });
          marcadores[claveSede].openPopup();
        }
      });
    });

    // Botón para ver todas las ubicaciones a la vez
    const btnVerTodas = document.getElementById("btnVerTodas");
    if (btnVerTodas) {
      btnVerTodas.addEventListener("click", () => {
        itemsSede.forEach((el) => el.classList.remove("active"));
        mapa.flyToBounds(grupoCoordenadas, {
          padding: [45, 45],
          duration: 1.2,
        });
      });
    }

    // Reajustar tamaño del mapa si cambia la resolución de la ventana
    window.addEventListener("resize", () => {
      mapa.invalidateSize();
    });
  }

  // ==========================================
  // 2. BOTÓN PARA COPIAR EL CORREO EN UN CLIC
  // ==========================================
  const btnCopiarCorreo = document.getElementById("btnCopiarCorreo");
  if (btnCopiarCorreo) {
    btnCopiarCorreo.addEventListener("click", () => {
      const correo = "administracion@ciapeco.com";
      navigator.clipboard.writeText(correo).then(() => {
        const textoOriginal = btnCopiarCorreo.innerHTML;
        btnCopiarCorreo.innerHTML = '<i class="bi bi-check2"></i> ¡Copiado!';
        setTimeout(() => {
          btnCopiarCorreo.innerHTML = textoOriginal;
        }, 2000);
      });
    });
  }
});
