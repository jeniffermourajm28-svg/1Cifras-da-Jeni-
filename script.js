const iconeBusca = document.getElementById("icone-busca");
const botao = document.getElementById("botaoBuscar");
const texto = document.getElementById("descricao");
const busca = document.getElementById("busca");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("lista-musicas");
const modoPalcoBtn = document.getElementById("modoPalcoBtn");
const btnCompartilhar = document.getElementById("btnCompartilhar");

modoPalcoBtn.style.display = "none";
iconeBusca.style.display = "none";

/* ===============================
   NORMALIZAR TEXTO
================================ */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* ===============================
   ATUALIZAR URL
================================ */
function atualizarURL(chave, modoPalco = false) {
  const params = new URLSearchParams();
  params.set("cifra", chave);

  if (modoPalco) {
    params.set("modo", "palco");
  }

  history.pushState({}, "", "?" + params.toString());
}

/* ===============================
   MOSTRAR CIFRA
================================ */
function mostrarCifra(chave, modoPalco = false) {
  atualizarURL(chave, modoPalco);

  resultado.classList.remove("mostrar");
  resultado.style.display = "block";

  resultado.innerHTML = `
    <h2>${cifras[chave].titulo}</h2>
    <p><strong>Artista:</strong> ${cifras[chave].artista}</p>
    <pre>${cifras[chave].cifra}</pre>
  `;

  resultado.offsetHeight;
  resultado.classList.add("mostrar");

  texto.textContent = "Cifra selecionada:";
  modoPalcoBtn.style.display = "block";

  botao.style.display = "none";
  busca.style.display = "none";
  lista.style.display = "none";
  iconeBusca.style.display = "block";
}

/* ===============================
   MONTAR LISTA
================================ */
function montarLista() {
  lista.innerHTML = "";

  for (let chave in cifras) {
    const item = document.createElement("div");
    item.className = "musica";
    item.innerHTML = `
      <strong>${cifras[chave].titulo}</strong>
      <span>${cifras[chave].artista}</span>
    `;

    item.addEventListener("click", () => {
      mostrarCifra(chave);
    });

    lista.appendChild(item);
  }

  lista.style.display = "block";
}

/* ===============================
   BOTÃO INICIAL
================================ */
botao.addEventListener("click", () => {
  texto.textContent = "Escolha uma música ou digite para buscar:";
  busca.style.display = "block";
  lista.style.display = "block";
  botao.style.display = "none";
  montarLista();
});

/* ===============================
   BUSCA
================================ */
busca.addEventListener("input", () => {
  const valor = normalizar(busca.value);
  lista.innerHTML = "";

  let encontrou = false;

  for (let chave in cifras) {
    const titulo = normalizar(cifras[chave].titulo);
    const artista = normalizar(cifras[chave].artista);

    if (titulo.includes(valor) || artista.includes(valor)) {
      encontrou = true;

      const item = document.createElement("div");
      item.className = "musica";
      item.innerHTML = `
        <strong>${cifras[chave].titulo}</strong>
        <span>${cifras[chave].artista}</span>
      `;

      item.addEventListener("click", () => {
        mostrarCifra(chave);
      });

      lista.appendChild(item);
    }
  }

  texto.textContent = encontrou ? "Resultados:" : "Nenhuma música encontrada 😕";
});

/* ===============================
   ÍCONE DE BUSCA
================================ */
iconeBusca.addEventListener("click", () => {
  busca.style.display = "block";
  lista.style.display = "block";
  botao.style.display = "none";
  iconeBusca.style.display = "none";
  modoPalcoBtn.style.display = "none";
  busca.focus();
});

/* ===============================
   MODO PALCO
================================ */
modoPalcoBtn.addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const chave = params.get("cifra");

  atualizarURL(chave, true);

  const palco = document.createElement("div");
  palco.className = "modo-palco";

  palco.innerHTML = `
    <div id="sairPalco">❌ Sair</div>
    <h2>${resultado.querySelector("h2").innerText}</h2>
    <p>${resultado.querySelector("p").innerText}</p>
    <pre>${resultado.querySelector("pre").innerText}</pre>
  `;

  document.body.appendChild(palco);

  document.getElementById("sairPalco").addEventListener("click", () => {
    palco.remove();
    atualizarURL(chave, false);
  });
});

/* ===============================
   RESTAURAR PELO LINK
================================ */
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const cifra = params.get("cifra");
  const modo = params.get("modo");

  if (cifra) {
    mostrarCifra(cifra);
  }

  if (modo === "palco") {
    setTimeout(() => modoPalcoBtn.click(), 300);
  }
});

/* ===============================
   COMPARTILHAR
================================ */
btnCompartilhar?.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert("Link copiado! 🎶"));
});







