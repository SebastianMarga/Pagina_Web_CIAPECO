document.addEventListener('DOMContentLoaded', () => {
    // Efecto visual sutil al cargar los pilares de la empresa
    const pilares = document.querySelectorAll('.pilar-card');
    pilares.forEach((pilar, index) => {
        pilar.style.opacity = '0';
        pilar.style.transition = `opacity 0.5s ease ${index * 0.15}s`;
        setTimeout(() => {
            pilar.style.opacity = '1';
        }, 100);
    });
});