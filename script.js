<<<<<<< HEAD
// MENU MOBILE
const btn = document.getElementById('menu-btn')
const nav = document.getElementById('nav')

btn.addEventListener('click',()=>{
nav.classList.toggle('active')
})


// LOADING (CORRIGIDO)
window.addEventListener('load', () => {
document.getElementById('loader').style.display = 'none'
})


// SCROLL ANIMATION
const reveals = document.querySelectorAll('.reveal')

window.addEventListener('scroll', ()=>{

reveals.forEach(el => {

const windowHeight = window.innerHeight
const elementTop = el.getBoundingClientRect().top
const visible = 100

if(elementTop < windowHeight - visible){
el.classList.add('active')
}

})

})


// DARK / LIGHT MODE
const themeBtn = document.getElementById('theme-toggle')

themeBtn.addEventListener('click',()=>{

document.body.classList.toggle('light')

const icon = themeBtn.querySelector("i")

if(document.body.classList.contains("light")){
icon.classList.remove("fa-moon")
icon.classList.add("fa-sun")
}else{
icon.classList.remove("fa-sun")
icon.classList.add("fa-moon")
}

})

const words = [
"Full Stack",
"Backend",
"Frontend",
"Node.js",
"JavaScript"
]

let wordIndex = 0
let charIndex = 0
let isDeleting = false

const typing = document.querySelector(".typing")

function type(){

const current = words[wordIndex]

if(isDeleting){
charIndex--
}else{
charIndex++
}

typing.textContent = current.substring(0, charIndex)

let speed = isDeleting ? 50 : 100

if(!isDeleting && charIndex === current.length){
speed = 1200
isDeleting = true
}

else if(isDeleting && charIndex === 0){
isDeleting = false
wordIndex++

if(wordIndex === words.length){
wordIndex = 0
}
}

setTimeout(type, speed)
}

type()
=======
/* =========================
   SCROLL SUAVE
========================= */
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* =========================
   ANIMAÇÃO SEÇÕES
========================= */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });

sections.forEach(s => observer.observe(s));

/* =========================
   TEMA (LIGHT/DARK)
========================= */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark"));
});
if (localStorage.getItem("tema") === "true") {
    document.body.classList.add("dark");
}

/* =========================
   MOSTRAR MAIS (E-BOOK)
========================= */
const btnToggleTexto = document.getElementById("toggleTexto");
const textoExtra = document.getElementById("textoExtra");

btnToggleTexto.addEventListener("click", () => {
    textoExtra.classList.toggle("hidden");
    btnToggleTexto.innerText = textoExtra.classList.contains("hidden")
        ? "Mostrar mais"
        : "Mostrar menos";
});

/* =========================
   FAVORITOS
========================= */
function toggleFavorito(btn) {
    const titulo = btn.closest(".projeto-card").querySelector("h3").innerText;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(titulo)) {
        favoritos = favoritos.filter(f => f !== titulo);
        btn.innerText = "Favoritar ⭐";
    } else {
        favoritos.push(titulo);
        btn.innerText = "Remover ✖";
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

window.addEventListener("load", () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    document.querySelectorAll(".projeto-card .fav-btn").forEach(btn => {
        const title = btn.closest(".projeto-card").querySelector("h3").innerText;
        if (favoritos.includes(title)) btn.innerText = "Remover ✖";
    });
});

/* =========================
   CONTATO – EXIBIR SUCESSO
========================= */
const form = document.getElementById("form-contato");
const msgSucesso = document.getElementById("msg-sucesso");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    msgSucesso.classList.remove("hidden");

    setTimeout(() => {
        msgSucesso.classList.add("hidden");
    }, 3000);

    form.reset();
});

/* =========================
   MODAL GALERIA
========================= */
const modal = document.getElementById("modalGaleria");
const modalImg = document.getElementById("imgModal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".galeria-item").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

/* =========================
   MENU MOBILE
========================= */
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const navOverlay = document.getElementById("navOverlay");

navToggle.addEventListener("click", () => {
    const opened = navList.classList.toggle("open");
    navOverlay.hidden = !opened;
    navToggle.setAttribute("aria-expanded", opened);
});

navOverlay.addEventListener("click", () => {
    navList.classList.remove("open");
    navOverlay.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
        navList.classList.remove("open");
        navOverlay.hidden = true;
    });
});
>>>>>>> 2a00ef4d22ce336e8d20d7e6a1dda4b0bafdad3d
