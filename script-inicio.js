const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});
//efecto al activar el menu
overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
})
function cerrarMenu() {
        menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
}


// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
});