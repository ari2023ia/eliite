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






const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// Función para actualizar slider
function updateSlider() {
    // Mueve la pista al slide actual
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Activa la slide correspondiente
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
    });

    // Activa el dot correspondiente
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// Eventos botones
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

// Eventos dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
});

// Swipe para móvil y arrastrar con mouse
let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
});
track.addEventListener("touchend", e => {
    if (!isDragging) return;
    handleSwipe(e.changedTouches[0].clientX);
    isDragging = false;
});
track.addEventListener("mousedown", e => {
    startX = e.clientX;
    isDragging = true;
});
track.addEventListener("mouseup", e => {
    if (!isDragging) return;
    handleSwipe(e.clientX);
    isDragging = false;
});

function handleSwipe(endX) {
    const diff = startX - endX;
    if (diff > 50) currentIndex = (currentIndex + 1) % slides.length;
    else if (diff < -50) currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

// Inicializa slider
updateSlider();