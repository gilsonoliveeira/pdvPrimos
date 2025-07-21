// Alternar visibilidade do valor do caixa
let caixaVisivel = true;
const botaoCaixa = document.getElementById("toggle-caixa");
const valorCaixa = document.getElementById("valor-caixa");

let valorCaixaAtual = 0; // Mantida no escopo global

// Carrega os produtos do localStorage e adiciona as entradas na tela
window.onload = function () {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];


  if (movimentacoes.length === 0) {
    const novaMovimentacao = document.createElement("div");
    novaMovimentacao.classList.add("movimento");
    novaMovimentacao.innerHTML = `
    <strong>Sem movimentações até o momento!</strong>
  `;
  novaMovimentacao.style.justifyContent = 'center';
  novaMovimentacao.style.color = 'red';

  const container = document.querySelector('.movimentacoes');
  container.appendChild(novaMovimentacao);
  }

  movimentacoes.forEach((mov) => {
    if (mov.tipo === "entrada") {
      adicionarEntrada(mov.nome, mov.descricao, mov.preco);
    } else if (mov.tipo === "saida") {
      adicionarSaida(mov.nome, mov.descricao, mov.preco);
    } else if (mov.tipo === "venda") {
      const nomesProdutos = Array.isArray(mov.produtos)
        ? mov.produtos.map((prod) => prod.nome).join(", ")
        : "Nenhum produto";

      adicionarVenda(mov.nome, mov.produtos, mov.valor);
    }
  });
};

// Adiciona a data atual ao elemento com id "data-caixa"
function addData() {
  const dataCaixa = new Date();
  const dia = String(dataCaixa.getDate()).padStart(2, "0");
  const mes = String(dataCaixa.getMonth() + 1).padStart(2, "0");
  const ano = dataCaixa.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;
  let diaSemana = dataCaixa.getDay();
  switch (diaSemana) {
    case 0:
      diaSemana = "Domingo";
      break;
    case 1:
      diaSemana = "Segunda-Feira";
      break;
    case 2:
      diaSemana = "Terça-Feira";
      break;
    case 3:
      diaSemana = "Quarta-Feira";
      break;
    case 4:
      diaSemana = "Quinta-Feira";
      break;
    case 5:
      diaSemana = "Sexta-Feira";
      break;
    case 6:
      diaSemana = "Sábado";
    default:
      diaSemana = "";
      break;
  }

  document.getElementById(
    "data-caixa"
  ).innerHTML = `<h2>${dataFormatada} - ${diaSemana} </h2>`;
}

addData();

function adicionarEntrada(nomeProduto, descricao, preco) {
  preco = parseFloat(preco) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-verde"></div>
    <div class="info">
      <strong>Cliente: ${nomeProduto}</strong>
      <p>${descricao}</p>
    </div>
    <span class="valor verde">R$${preco.toFixed(2).replace(".", ",")}</span>
    <div class="opcoes">
      <button class="excluir">🗑️</button>
    </div>
  `;

  novaMovimentacao.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") return;
    const opcoes = this.querySelector(".opcoes");
    if (opcoes) {
      opcoes.style.display =
        opcoes.style.display === "none" || opcoes.style.display === ""
          ? "flex"
          : "none";
    }
  });

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarEntrada = adicionarEntrada;

function adicionarSaida(nomeProduto, descricao, preco) {
  preco = parseFloat(preco) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-vermelha"></div>
    <div class="info">
      <strong>Cliente: ${nomeProduto}</strong> 
      <p>${descricao}</p>
    </div>
    <span class="valor vermelho">R$${preco.toFixed(2).replace(".", ",")}</span>
    <div class="opcoes">
      <button class="excluir">🗑️</button>
    </div>
  `;

  // Adiciona evento para mostrar/ocultar botões ao clicar na movimentação
  novaMovimentacao.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") return;
    const opcoes = this.querySelector(".opcoes");
    if (opcoes) {
      opcoes.style.display =
        opcoes.style.display === "none" || opcoes.style.display === ""
          ? "flex"
          : "none";
    }
  });

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarSaida = adicionarSaida;

function adicionarVenda(nomeCliente, produtos, totalValor) {
  totalValor = parseFloat(totalValor) || 0;

  const novaMovimentacao = document.createElement("div");
  novaMovimentacao.classList.add("movimento");
  novaMovimentacao.innerHTML = `
    <div class="barra cor-azul"></div>
    <div class="info">
      <strong>${nomeCliente}</strong>
      <p>Itens: ${produtos
        .map((p) => p.nome + " " + "[" + p.quantidade + "x" + "]")
        .join(", ")}</p>
    </div>
    <span class="valor verde">R$${totalValor
      .toFixed(2)
      .replace(".", ",")}</span>
    <div class="opcoes">
      <button class="excluir" onclick="toggleOpcoes(this)">🗑️</button>
    </div>
  `;

  // Adiciona evento para mostrar/ocultar botões ao clicar na movimentação
  novaMovimentacao.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") return;
    const opcoes = this.querySelector(".opcoes");
    if (opcoes) {
      opcoes.style.display =
        opcoes.style.display === "none" || opcoes.style.display === ""
          ? "flex"
          : "none";
    }
  });

  const container = document.querySelector(".movimentacoes");
  if (container) {
    container.appendChild(novaMovimentacao);
  }
}

window.adicionarVenda = adicionarVenda;

window.addEventListener("DOMContentLoaded", () => {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

  const totalEntrada = somarEntradas(movimentacoes);
  const totalSaida = somarSaidas(movimentacoes);

  const resumoEntrada = document.querySelector(".resumo-entrada");
  if (resumoEntrada) {
    resumoEntrada.textContent = `+${totalEntrada.toFixed(2).replace(".", ",")}`;
  }

  const resumoSaida = document.querySelector(".resumo-saida");
  if (resumoSaida) {
    resumoSaida.textContent = `-${totalSaida.toFixed(2).replace(".", ",")}`;
  }

  const valorCaixaEl = document.getElementById("valor-caixa");
  if (valorCaixaEl) {
    valorCaixaAtual = totalEntrada - totalSaida;
    valorCaixaEl.textContent = `R$${valorCaixaAtual
      .toFixed(2)
      .replace(".", ",")}`;
  }
});

if (botaoCaixa) {
  botaoCaixa.addEventListener("click", () => {
    caixaVisivel = !caixaVisivel;
    valorCaixa.textContent = caixaVisivel
      ? `R$${valorCaixaAtual.toFixed(2).replace(".", ",")}`
      : "••••••";
  });
}

const botaoToggle = document.getElementById("toggle-botoes");
const botoesFlutuantes = document.getElementById("botoes-flutuantes");
let botoesVisiveis = false;

if (botaoToggle && botoesFlutuantes) {
  botaoToggle.addEventListener("click", () => {
    botoesVisiveis = !botoesVisiveis;
    botoesFlutuantes.style.display = botoesVisiveis ? "flex" : "none";
  });
}

function toggleOpcoes(elemento) {
  elemento.classList.toggle("ativo");
}

const botaoCadeado = document.getElementById("botao-cadeado");
if (botaoCadeado) {
  botaoCadeado.addEventListener("click", () => {
    abrirModal(1);
  });
}

function abrirModal(numero) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const modal = document.getElementById(`modal${numero}`);
  if (modal) modal.style.display = "flex";
  if (numero === 2) {
    let estoque = document.querySelector(".estoque-simulacao");
    estoque.innerHTML = "";
    produtos.forEach((p) => {
      const produto = document.createElement("p");
      produto.textContent = `${p.nome} - ${p.quantidade} un.`;
      estoque.appendChild(produto);
    });
  }
  if (numero === 3) {
    const valorEl = document.querySelector("#valor-caixa");
    const modalBox = document.querySelector("#modal3 .modal-box");
    const paragrafo = modalBox.querySelector("p");

    if (valorEl && modalBox && paragrafo) {
      const valor = valorEl.textContent;

      // Remover <strong> anterior, se existir (opcional)
      const strongAntigo = modalBox.querySelector("p + strong");
      if (strongAntigo) strongAntigo.remove();

      // Criar novo <strong>
      const valorCaixa = document.createElement("strong");
      valorCaixa.textContent = valor;

      // Inserir logo após o <p>
      paragrafo.insertAdjacentElement("afterend", valorCaixa);
    }
  }
}

function fecharModal(numero) {
  const modal = document.getElementById(`modal${numero}`);
  if (modal) modal.style.display = "none";
}

function proximoModal(numero) {
  fecharModal(numero - 1);
  abrirModal(numero);
}

function finalizarFechamento() {
  fecharModal(4);

  const resumoEntrada = document.querySelector(".resumo-entrada");
  const resumoSaida = document.querySelector(".resumo-saida");
  if (resumoEntrada) resumoEntrada.textContent = "+0,00";
  if (resumoSaida) resumoSaida.textContent = "-0,00";

  const container = document.querySelector(".movimentacoes");
  if (container) container.innerHTML = "<h3>Movimentações</h3>";
}

const btnConfirmar = document.getElementById("confirmar-exclusao");
const btnCancelar = document.getElementById("cancelar-exclusao");

if (btnConfirmar) {
  btnConfirmar.addEventListener("click", () => {
    if (movimentoParaExcluir) {
      movimentoParaExcluir.remove();
      movimentoParaExcluir = null;
    }
    const modalExcluir = document.getElementById("modal-excluir");
    if (modalExcluir) modalExcluir.style.display = "none";
  });
}

if (btnCancelar) {
  btnCancelar.addEventListener("click", () => {
    movimentoParaExcluir = null;
    const modalExcluir = document.getElementById("modal-excluir");
    if (modalExcluir) modalExcluir.style.display = "none";
  });
}

let movimentoParaExcluir = null;

document.querySelector(".movimentacoes").addEventListener("click", (e) => {
  const botao = e.target;

  // Se clicou na lixeira
  if (botao.classList.contains("excluir")) {
    e.stopPropagation();
    movimentoParaExcluir = botao.closest(".movimento");

    const modalExcluir = document.getElementById("modal-excluir");
    if (modalExcluir) modalExcluir.style.display = "flex";
  }
});
