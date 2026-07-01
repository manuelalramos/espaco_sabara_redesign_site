// =========================================================
// MENU DO CELULAR
// =========================================================

const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");
const linksMenu = document.querySelectorAll("#menu a");

function alternarMenu() {
  const menuEstaAberto = menu.classList.toggle("ativo");

  botaoMenu.classList.toggle("ativo");
  document.body.classList.toggle("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
}

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", alternarMenu);
}

linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    if (menu.classList.contains("ativo")) {
      alternarMenu();
    }
  });
});

// =========================================================
// ANO AUTOMÁTICO NO RODAPÉ
// =========================================================

const campoAno = document.querySelector("#ano");

if (campoAno) {
  campoAno.textContent = new Date().getFullYear();
}

// =========================================================
// PROGRESSO DE SCROLL E MENU ATIVO
// =========================================================

const progressoScroll = document.querySelector("#progresso-scroll");
const secoesMenu = document.querySelectorAll("main section[id], header[id]");

function atualizarProgressoScroll() {
  if (!progressoScroll) {
    return;
  }

  const alturaPagina = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = alturaPagina > 0 ? window.scrollY / alturaPagina : 0;
  progressoScroll.style.transform = "scaleX(" + Math.min(progresso, 1) + ")";
}

window.addEventListener("scroll", atualizarProgressoScroll, { passive: true });
atualizarProgressoScroll();

const observadorMenu = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) {
        return;
      }

      const idSecao = entrada.target.getAttribute("id");
      linksMenu.forEach(function (link) {
        link.classList.toggle("ativo", link.getAttribute("href") === "#" + idSecao);
      });
    });
  },
  {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0
  }
);

secoesMenu.forEach(function (secao) {
  observadorMenu.observe(secao);
});

// =========================================================
// ANIMAÇÃO LEVE AO ROLAR
// =========================================================

const elementosParaAnimar = document.querySelectorAll(
  ".hero-texto, .hero-imagens, .beneficios article, .estrutura-texto, .estrutura-mosaico, .cabecalho-secao, .eventos-grade article, .destaque-grade, .foto-galeria, .contato-texto, .contato-card, .rodape-conteudo"
);

elementosParaAnimar.forEach(function (elemento) {
  elemento.classList.add("animar");
});

const observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.14
  }
);

elementosParaAnimar.forEach(function (elemento) {
  observador.observe(elemento);
});

// =========================================================
// CONTADOR DA CAPACIDADE
// =========================================================

const contadores = document.querySelectorAll(".contador");

const observadorContador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) {
        return;
      }

      const contador = entrada.target;
      const numeroFinal = Number(contador.dataset.numero);
      const duracao = 4600;
      const inicio = performance.now();

      function animarContador(tempoAtual) {
        const progresso = Math.min((tempoAtual - inicio) / duracao, 1);
        const valor = Math.floor(progresso * numeroFinal);
        contador.textContent = valor;

        if (progresso < 1) {
          requestAnimationFrame(animarContador);
        }
      }

      requestAnimationFrame(animarContador);
      observadorContador.unobserve(contador);
    });
  },
  {
    threshold: 0.65
  }
);

contadores.forEach(function (contador) {
  observadorContador.observe(contador);
});

// =========================================================
// WHATSAPP FLUTUANTE
// =========================================================

const botaoWhatsapp = document.querySelector("#whatsapp-botao");
const cardWhatsapp = document.querySelector("#whatsapp-card");
const fecharWhatsapp = document.querySelector("#whatsapp-fechar");

function abrirWhatsapp() {
  const estaAberto = cardWhatsapp.classList.toggle("ativo");
  cardWhatsapp.setAttribute("aria-hidden", !estaAberto);
  botaoWhatsapp.setAttribute("aria-expanded", estaAberto);
}

function fecharCardWhatsapp() {
  cardWhatsapp.classList.remove("ativo");
  cardWhatsapp.setAttribute("aria-hidden", "true");
  botaoWhatsapp.setAttribute("aria-expanded", "false");
}

if (botaoWhatsapp && cardWhatsapp) {
  botaoWhatsapp.addEventListener("click", abrirWhatsapp);
}

if (fecharWhatsapp) {
  fecharWhatsapp.addEventListener("click", fecharCardWhatsapp);
}

// =========================================================
// LIGHTBOX DA GALERIA
// =========================================================

const lightbox = document.querySelector("#lightbox");
const lightboxImagem = document.querySelector("#lightbox-imagem");
const fotosGaleria = document.querySelectorAll(".foto-galeria img");

function abrirLightbox(foto) {
  lightboxImagem.src = foto.src;
  lightboxImagem.alt = foto.alt;
  lightbox.classList.add("ativo");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
}

function fecharLightbox() {
  lightbox.classList.remove("ativo");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");
}

fotosGaleria.forEach(function (foto) {
  foto.addEventListener("click", function () {
    abrirLightbox(foto);
  });
});

document.querySelectorAll("[data-fechar-lightbox]").forEach(function (botao) {
  botao.addEventListener("click", fecharLightbox);
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    fecharLightbox();
    fecharCardWhatsapp();
  }
});
