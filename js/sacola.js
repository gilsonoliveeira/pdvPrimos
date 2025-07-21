const sacola = JSON.parse(localStorage.getItem("sacola")) || [];
const lista = document.querySelector(".sacola-lista");

lista.innerHTML = ""; // Limpa antes de preencher

//Verifica se tem itens na sacola //
if (sacola.length === 0) {
  const item = document.createElement("div");
  item.classList.add("item-sacola");
  item.innerHTML = `<strong>Sem itens no carrinho!</strong>`;
  item.style.color = "red";
  item.style.justifyContent = "center";
  lista.appendChild(item);
}

sacola.forEach((produto) => {
  const item = document.createElement("div");
  item.classList.add("item-sacola");

  item.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <div class="info">
        <strong>${produto.nome}</strong>
        <p>R$ ${produto.preco.toFixed(2)}</p>
    </div>
    <div class="controle">
        <button class="menos">−</button>
        <span class="quantidade">${produto.quantidade}</span>
        <button class="mais">+</button>
        <button class="excluir">🗑️</button>
    </div>
  `;

  lista.appendChild(item);
});

const resumo = document.querySelector(".resumo-venda");
let totalItens = 0;
let totalValor = 0;
sacola.forEach((produto) => {
  totalItens += produto.quantidade;
  totalValor += produto.preco * produto.quantidade;
});

resumo.innerHTML = `
  <span><strong>Itens:</strong> ${totalItens}</span>
  <span><strong>Total:</strong> R$ ${totalValor.toFixed(2)}</span>
`;

document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("mais")) {
    const item = evento.target.closest(".item-sacola");
    const quantidadeSpan = item.querySelector(".quantidade");
    let quantidade = parseInt(quantidadeSpan.textContent);
    quantidade++;
    quantidadeSpan.textContent = quantidade;

    atualizarResumoVenda();
  } else if (evento.target.classList.contains("menos")) {
    const item = evento.target.closest(".item-sacola");
    const quantidadeSpan = item.querySelector(".quantidade");
    let quantidade = parseInt(quantidadeSpan.textContent);

    if (quantidade > 1) {
      quantidade--;
      quantidadeSpan.textContent = quantidade;
      atualizarResumoVenda();
    } else {
      carregarModal("Quantidade mínima atingida!");
    }
  } else if (evento.target.classList.contains("excluir")) {
    const item = evento.target.closest(".item-sacola");
    item.remove();

    //Verifica se ainda há itens no carrinho após apagar o ultimo produto do carrinho //
    const itensRestantes = document.querySelectorAll(".item-sacola");
    if (itensRestantes.length === 0) {
      const mensagem = document.createElement("div");
      mensagem.classList.add("item-sacola");
      mensagem.innerHTML = `<strong>Sem itens no carrinho!</strong>`;
      mensagem.style.color = "red";
      mensagem.style.justifyContent = "center";
      lista.appendChild(mensagem);
    }

    atualizarResumoVenda();
  }
});

function atualizarResumoVenda() {
  const itens = document.querySelectorAll(".item-sacola");
  let totalItens = 0;
  let totalValor = 0;

  itens.forEach((item) => {
    const quantidade = parseInt(item.querySelector(".quantidade").textContent);
    const preco = parseFloat(
      item.querySelector(".info p").textContent.replace("R$ ", "")
    );

    totalItens += quantidade;
    totalValor += quantidade * preco;
  });

  const resumo = document.querySelector(".resumo-venda");
  resumo.innerHTML = `
    <span><strong>Itens:</strong> ${totalItens}</span>
    <span><strong>Total:</strong> R$ ${totalValor.toFixed(2)}</span>
  `;
}

document
  .querySelector(".botao-ver-sacola")
  .addEventListener("click", function () {
    if (sacola.length === 0) {
      carregarModal("❌Seu carrinho está vazio!");
      return;
    }

    //Verifica se o cliente foi informado
    const nomeCliente = document.getElementById("cliente").value;
    if (!nomeCliente) {
      carregarModal("❌Por favor, preencha o nome do cliente!");
      return;
    }

    carregarModal("Salvo com sucesso!✅");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);

    // Salva a venda no localStorage
    const movimentacoes =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];

    movimentacoes.push({
      tipo: "venda",
      nome: `Venda para ${nomeCliente}`,
      valor: totalValor,
      data: new Date().toLocaleString("pt-BR"),
      produtos: sacola.map((produto) => ({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: produto.quantidade,
      })),
    });

    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

    adicionarVenda(nomeCliente, produtos, totalValor);

    // Limpa a sacola após finalizar a venda
    localStorage.removeItem("sacola");
    sacola.length = 0;
    lista.innerHTML = "";
    atualizarResumoVenda();
  });

 
