// Scroll suave por botão
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Alternância de tema
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark"));
});

if (localStorage.getItem("tema") === "true") {
    document.body.classList.add("dark");
}

document.getElementById("toggleTexto").addEventListener("click", () => {
    const extra = document.getElementById("textoExtra");
    extra.classList.toggle("hidden");
    toggleTexto.innerText = extra.classList.contains("hidden") 
        ? "Mostrar mais" 
        : "Mostrar menos";
});

// Favoritar projetos (localStorage)
function toggleFavorito(btn) {
    const titulo = btn.parentElement.querySelector("h3").innerText;

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

// Validação simples de formulário
document.getElementById("form-contato").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("msg-sucesso").classList.remove("hidden");
});

// Animações com IntersectionObserver
const elements = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

elements.forEach(el => observer.observe(el));
// Modal da galeria
const modal = document.getElementById("modalGaleria");
const modalImg = document.getElementById("imgModal");
const closeModal = document.querySelector(".close-modal");

// Abre modal ao clicar na imagem da galeria
document.querySelectorAll(".galeria-grid img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

// Fechar modal ao clicar no X
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fechar modal clicando fora da imagem
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Fechar com tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});

