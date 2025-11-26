/* =========================================================
   SCROLL SUAVE
========================================================= */
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* =========================================================
   ANIMAÇÃO DAS SEÇÕES
========================================================= */
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.18 });

sections.forEach(sec => sectionObserver.observe(sec));

/* =========================================================
   TEMA (LIGHT / DARK)
========================================================= */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark"));
});

// Carregar tema salvo
if (localStorage.getItem("tema") === "true") {
    document.body.classList.add("dark");
}

/* =========================================================
   MOSTRAR MAIS (E-BOOK)
========================================================= */
const btnToggleTexto = document.getElementById("toggleTexto");
const textoExtra = document.getElementById("textoExtra");

btnToggleTexto.addEventListener("click", () => {
    textoExtra.classList.toggle("hidden");
    btnToggleTexto.innerText = textoExtra.classList.contains("hidden")
        ? "Mostrar mais"
        : "Mostrar menos";
});

/* =========================================================
   FAVORITAR PROJETOS
========================================================= */
const botoesFavoritos = document.querySelectorAll(".projeto-card button");

function toggleFavorito(btn) {
    const card = btn.closest(".projeto-card");
    const titulo = card.querySelector("h3").innerText;

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

// Manter favoritos após reload
window.addEventListener("load", () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    botoesFavoritos.forEach(btn => {
        const titulo = btn.closest(".projeto-card").querySelector("h3").innerText;
        if (favoritos.includes(titulo)) {
            btn.innerText = "Remover ✖";
        }
    });
});

/* =========================================================
   FORMULÁRIO CONTATO
========================================================= */
const form = document.getElementById("form-contato");
const msgSucesso = document.getElementById("msg-sucesso");

form.addEventListener("submit", e => {
    e.preventDefault();
    msgSucesso.classList.remove("hidden");

    setTimeout(() => msgSucesso.classList.add("hidden"), 3000);
});

/* =========================================================
   MODAL DA GALERIA
========================================================= */
const modal = document.getElementById("modalGaleria");
const modalImg = document.getElementById("imgModal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".galeria-grid img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.style.display = "none";
});

/* =========================================================
   MENU MOBILE (HAMBÚRGUER)
========================================================= */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navList.classList.toggle("open");
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
        navList.classList.remove("open");
    });
});
