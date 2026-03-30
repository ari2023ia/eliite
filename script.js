/* ══════════════════════════════════════
   MENÚ MÓVIL
══════════════════════════════════════ */
const menuToggle  = document.getElementById('menuToggle')
const navMenu     = document.getElementById('navMenu')
const overlayMenu = document.getElementById('overlay')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  navMenu.classList.toggle('active')
  overlayMenu.classList.toggle('active')
})
overlayMenu.addEventListener('click', () => {
  menuToggle.classList.remove('active')
  navMenu.classList.remove('active')
  overlayMenu.classList.remove('active')
})
function cerrarMenu() {
  menuToggle.classList.remove('active')
  navMenu.classList.remove('active')
  overlayMenu.classList.remove('active')
}
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active')
    navMenu.classList.remove('active')
    overlayMenu.classList.remove('active')
  })
})

/* ══════════════════════════════════════
   BOTONES DE SERVICIO
══════════════════════════════════════ */
document.querySelectorAll('.btn-servicio').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-servicio').forEach(b => b.classList.remove('activo'))
    btn.classList.add('activo')
  })
})
document.querySelectorAll('.btn-servicio-cel').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-servicio-cel').forEach(b => b.classList.remove('activo'))
    btn.classList.add('activo')
  })
})

/* ══════════════════════════════════════
   GALERÍA CARDS  (usa .slide / .activo)
══════════════════════════════════════ */
function initCard(cardEl) {
  const slides   = Array.from(cardEl.querySelectorAll('.slide'))
  const puntosCt = cardEl.querySelector('.indicadores')
  const progreso = cardEl.querySelector('.progreso-bar')
  const numAct   = cardEl.querySelector('.num-actual')
  const numTot   = cardEl.querySelector('.num-total')
  const btnPrev  = cardEl.querySelector('.btn-prev')
  const btnNext  = cardEl.querySelector('.btn-next')
  const cardBody = cardEl.querySelector('.card-body')

  const TOTAL = slides.length
  let current = 0
  let timer   = null

  numTot.textContent = String(TOTAL).padStart(2, '0')

  slides.forEach((_, i) => {
    const p = document.createElement('div')
    p.className = 'punto' + (i === 0 ? ' activo' : '')
    p.addEventListener('click', () => { clearTimeout(timer); irA(i); reiniciarTimer() })
    puntosCt.appendChild(p)
  })

  function actualizarPuntos() {
    puntosCt.querySelectorAll('.punto').forEach((p, i) =>
      p.classList.toggle('activo', i === current))
  }

  function irA(idx) {
    slides[current].classList.remove('activo')
    current = (idx + TOTAL) % TOTAL
    slides[current].classList.add('activo')
    numAct.textContent = String(current + 1).padStart(2, '0')
    actualizarPuntos()
    iniciarProgreso()
  }

  function iniciarProgreso() {
    progreso.classList.remove('animando')
    progreso.style.width = '0%'
    void progreso.offsetWidth
    progreso.classList.add('animando')
  }

  function reiniciarTimer() {
    clearTimeout(timer)
    timer = setTimeout(() => { irA(current + 1); reiniciarTimer() }, 3900)
  }

  reiniciarTimer()
  iniciarProgreso()

  btnNext.addEventListener('click', () => { clearTimeout(timer); irA(current + 1); reiniciarTimer() })
  btnPrev.addEventListener('click', () => { clearTimeout(timer); irA(current - 1); reiniciarTimer() })

  cardBody.addEventListener('mouseenter', () => {
    progreso.classList.remove('animando')
    progreso.style.width = '0%'
    clearTimeout(timer)
  })
  cardBody.addEventListener('mouseleave', () => { reiniciarTimer(); iniciarProgreso() })
}

document.querySelectorAll('.card-galeria').forEach(initCard)

/* ══════════════════════════════════════
   SLIDER PROPIETARIOS  (usa .pres-slide / .pres-active)
   — completamente independiente de la galería
══════════════════════════════════════ */
const presTrack   = document.querySelector('.pres-track')
const presSlides  = document.querySelectorAll('.pres-slide')
const presDots    = document.querySelectorAll('.pres-dot')
const presNext    = document.querySelector('.pres-next')
const presPrev    = document.querySelector('.pres-prev')

let presIndex = 0

function updatePres() {
  presTrack.style.transform = `translateX(-${presIndex * 100}%)`

  presSlides.forEach((s, i) => s.classList.toggle('pres-active', i === presIndex))
  presDots.forEach((d, i)   => d.classList.toggle('pres-dot-active', i === presIndex))
}

presNext.addEventListener('click', () => {
  presIndex = (presIndex + 1) % presSlides.length
  updatePres()
})
presPrev.addEventListener('click', () => {
  presIndex = (presIndex - 1 + presSlides.length) % presSlides.length
  updatePres()
})
presDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { presIndex = i; updatePres() })
})

// swipe / drag
let presStartX = 0, presDragging = false

presTrack.addEventListener('touchstart',  e => { presStartX = e.touches[0].clientX; presDragging = true })
presTrack.addEventListener('touchend',    e => { if (!presDragging) return; presHandleSwipe(e.changedTouches[0].clientX); presDragging = false })
presTrack.addEventListener('mousedown',   e => { presStartX = e.clientX; presDragging = true })
presTrack.addEventListener('mouseup',     e => { if (!presDragging) return; presHandleSwipe(e.clientX); presDragging = false })

function presHandleSwipe(endX) {
  const diff = presStartX - endX
  if      (diff >  50) presIndex = (presIndex + 1) % presSlides.length
  else if (diff < -50) presIndex = (presIndex - 1 + presSlides.length) % presSlides.length
  updatePres()
}

updatePres()