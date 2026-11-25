// js/footer.js
document.addEventListener("DOMContentLoaded", () => {
    const contenedorFooter = document.getElementById("footer-container");

    if (contenedorFooter) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("No se pudo cargar el footer");
                return response.text();
            })
            .then(data => {
                contenedorFooter.innerHTML = data;
            })
            .catch(error => {
                console.error("Error al cargar el pie de página:", error);
            });
    }
});