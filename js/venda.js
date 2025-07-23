const produtos = JSON.parse(localStorage.getItem("produtos")) || [];


function renderizarProdutos() {

  
  const produtosPreCarregados = [
    {
      id: 1, 
      imagem: "./images/pomada.jpg",
      nome: "Pomada",
      quantidade: 5,
      valor: 20,
    },
    {
      id: 2,
      imagem: "./images/shampoo.jpg",
      nome: "Shampoo",
      quantidade: 3,
      valor: 15,
    },
    {
      id: 3,
      imagem: "./images/batata.jpg",
      nome: "Batata Croques",
      quantidade: 10,
      valor: 5,
    },
  ];

  // Recupera os produtos já salvos ou um array vazio
  let produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (produtosSalvos.length === 0) {
    carregarModal(
      "Sem produtos em estoque! Por favor, cadastre um novo produto!"
    );

    setTimeout(() => {
      window.location.href = "estoque.html";
    }, 3000);
  }

  // Verifica se os produtos pré-carregados já existem
  produtosPreCarregados.forEach((pre) => {
    const existe = produtosSalvos.some((p) => p.id === pre.id);
    if (!existe) {
      produtosSalvos.push(pre);
    }
  });

  localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

  const produtosContainer = document.querySelector(".produtos-grid");
  produtosContainer.innerHTML = "";

  produtos.forEach((produto) => {
    const produtoDiv = document.createElement("div");
    produtoDiv.setAttribute("data-id", produto.id);
    produtoDiv.className = "item-produto";
    produtoDiv.setAttribute("data-nome", produto.nome);
    produtoDiv.setAttribute("data-preco", parseFloat(produto.valor).toFixed(2));
    produtoDiv.setAttribute("data-quantidade", produto.quantidade || 0);
    produtoDiv.setAttribute("imagem", produto.imagem || produto.nome);

    produtoDiv.innerHTML = `
      <span> ${produto.nome}</span>
      <img src="${produto.imagem || "./images/semimagem.jpg"}" alt="${
      produto.nome
    }">
      <p>R$ ${parseFloat(produto.valor).toFixed(2)}</p>
      <div class="controle-quantidade">
        <button class="menos">−</button>
        <span class="quantidade">0</span>
        <button class="mais">+</button>
      </div>
    `;

    produtosContainer.appendChild(produtoDiv);
  });
}

function atualizarResumoVenda() {
  const produtos = document.querySelectorAll(".item-produto");
  let totalItens = 0;
  let totalValor = 0;

  produtos.forEach((produto) => {
    const quantidade = parseInt(
      produto.querySelector(".quantidade").textContent
    );
    const preco = parseFloat(produto.getAttribute("data-preco"));

    totalItens += quantidade;
    totalValor += quantidade * preco;
  });

  const resumo = document.querySelector(".resumo-venda");
  resumo.innerHTML = `
    <span><strong>Itens:</strong> ${totalItens}</span>
    <span><strong>Total:</strong> R$ ${totalValor.toFixed(2)}</span>
  `;
}

document.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("mais")) {
    const item = evento.target.closest(".item-produto");
    const span = item.querySelector(".quantidade");
    const limite = parseInt(item.getAttribute("data-quantidade"));
    let atual = parseInt(span.textContent);

    if (atual < limite) {
      atual++;
      span.textContent = atual;
      atualizarResumoVenda();
    } else {
      alert("Quantidade máxima atingida!");
    }
  }

  if (evento.target.classList.contains("menos")) {
    const item = evento.target.closest(".item-produto");
    const span = item.querySelector(".quantidade");
    let atual = parseInt(span.textContent);

    if (atual > 0) {
      atual--;
      span.textContent = atual;
      atualizarResumoVenda();
    }
  }
});

renderizarProdutos();

document.querySelector(".botao-ver-sacola").addEventListener("click", () => {
  const produtos = document.querySelectorAll(".item-produto");
  const sacola = [];

  produtos.forEach((produto) => {
    const nome = produto.getAttribute("data-nome");
    const preco = parseFloat(produto.getAttribute("data-preco"));
    const quantidade = parseInt(
      produto.querySelector(".quantidade").textContent
    );
    const imagem = produto.getAttribute("imagem");
    const id = parseInt(produto.getAttribute("data-id"));

    if (quantidade > 0) {
      sacola.push({ id, nome, preco, quantidade, imagem });
    }
  });

  localStorage.setItem("sacola", JSON.stringify(sacola));
});
  

