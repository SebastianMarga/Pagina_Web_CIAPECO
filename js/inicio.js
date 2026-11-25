document.addEventListener('DOMContentLoaded', () => {
    const btnSaberMas = document.getElementById('btnSaberMas');
    const seccionOferta = document.getElementById('seccionOferta');

    // Desplazamiento suave e intuitivo al hacer clic en "Saber Más"
    if (btnSaberMas && seccionOferta) {
        btnSaberMas.addEventListener('click', () => {
            seccionOferta.scrollIntoView({ behavior: 'smooth' });
        });
    }
});