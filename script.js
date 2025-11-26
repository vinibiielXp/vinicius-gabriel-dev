/* =========================
   Helpers / utilitários
   ========================= */
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* =========================
   Seções (intersection)
   ========================= */
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.18 });
sections.forEach(s => sectionObserver.observe(s));

/* =========================
   Tema (dark / light)
   ========================= */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("tema", document.body.classList.contains("dark"));
    });
}
if (localStorage.getItem("tema") === "true") document.body.classList.add("dark");

/* =========================
   Mostrar mais – e-book
   ========================= */
const btnToggleTexto = document.getElementById("toggleTexto");
const textoExtra = document.getElementById("textoExtra");
if (btnToggleTexto && textoExtra) {
    btnToggleTexto.addEventListener("click", () => {
        textoExtra.classList.toggle("hidden");
        btnToggleTexto.innerText = textoExtra.classList.contains("hidden") ? "Mostrar mais" : "Mostrar menos";
    });
}

/* =========================
   Favoritos (localStorage)
   ========================= */
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

window.addEventListener("load", () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    document.querySelectorAll(".projeto-card .fav-btn").forEach(btn => {
        const t = btn.closest(".projeto-card").querySelector("h3").innerText;
        if (favoritos.includes(t)) btn.innerText = "Remover ✖";
    });
});

/* =========================
   Formulário – validação simples
   ========================= */
const form = document.getElementById("form-contato");
const msgSucesso = document.getElementById("msg-sucesso");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        // validação mínima
        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();
        if (!nome || !email || !mensagem) {
            alert("Preencha todos os campos antes de enviar.");
            return;
        }
        msgSucesso.classList.remove("hidden");
        setTimeout(() => msgSucesso.classList.add("hidden"), 3500);
        form.reset();
    });
}

/* =========================
   Modal galeria (acessível)
   ========================= */
const modal = document.getElementById("modalGaleria");
const modalImg = document.getElementById("imgModal");
const closeModal = document.querySelector(".close-modal");
let lastFocused = null;

function openModal(src, alt, opener) {
    lastFocused = opener || document.activeElement;
    modalImg.src = src;
    modalImg.alt = alt || "";
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    closeModal.focus();
    document.body.classList.add("modal-open");
}

function closeGaleria() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

document.querySelectorAll(".galeria-item").forEach(img => {
    // click
    img.addEventListener("click", (e) => openModal(img.src, img.alt, e.currentTarget));
    // keyboard (Enter)
    img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(img.src, img.alt, e.currentTarget);
        }
    });
});

if (closeModal) closeModal.addEventListener("click", closeGaleria);
modal.addEventListener("click", (e) => { if (e.target === modal) closeGaleria(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeGaleria(); });

/* =========================
   Menu mobile (overlay + lock scroll + aria)
   ========================= */
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");
const navOverlay = document.getElementById("navOverlay");

function openNav() {
    navList.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navOverlay.hidden = false;
    document.body.classList.add("menu-open");
}

function closeNav() {
    navList.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navOverlay.hidden = true;
    document.body.classList.remove("menu-open");
}

if (navToggle) {
    navToggle.addEventListener("click", () => {
        if (navList.classList.contains("open")) closeNav(); else openNav();
    });
}

// fechar clicando no overlay
if (navOverlay) navOverlay.addEventListener("click", closeNav);

// fechar ao clicar em um link do menu
document.querySelectorAll(".nav-list a").forEach(a => a.addEventListener("click", closeNav));

// fechar com ESC
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeNav(); closeGaleria(); } });

/* =========================
   pequenas melhorias de performance
   ========================= */
// desativar tabulação em imagens decorativas (se houver)
document.querySelectorAll('img[alt=""]').forEach(i => i.setAttribute('aria-hidden', 'true'));
