const nome = document.getElementById("nome");
const info = document.getElementById("descricao");
const valor = document.getElementById("valor");
const botaoConfirmar = document.getElementById("confirmar");

function validarCampos() {
  if (!nome.value.trim() || !info.value.trim() || !valor.value.trim()) {
    carregarModal('❌ Por favor, preencha todos os campos!');
    return false;
  }
  if (isNaN(valor.value) || parseFloat(valor.value) <= 0) {
    carregarModal('❌ O valor deve ser um número positivo!')
    return false;
  }
  return true;
}

function somarSaidas(movimentacoes) {
  const saidas = movimentacoes.filter((mov) => mov.tipo === "saida");
  return saidas.reduce(
    (total, saida) => total + (parseFloat(saida.valor || saida.preco) || 0),
    0
  );
}

window.somarSaidas = somarSaidas; // Expor a função globalmente

botaoConfirmar.addEventListener("click", (e) => {
  e.preventDefault();
  let id = Date.now(); // Gerar um ID único baseado no timestamp
  if (validarCampos()) {
    const saidas = JSON.parse(localStorage.getItem("movimentacoes")) || [];
    const novaSaida = {
      nome: nome.value.trim(),
      descricao: info.value.trim(),
      preco: parseFloat(valor.value),
      tipo: "saida",
      id,
    };
    saidas.push(novaSaida);
    localStorage.setItem("movimentacoes", JSON.stringify(saidas));

   carregarModal('Salvo com Sucesso!✅')

    setTimeout(() => {
      window.location.href = "index.html";
      nome.value = "";
      info.value = "";
      preco.value = "";
    }, 2000);

    adicionarSaida(novaSaida.nome, novaSaida.descricao, novaSaida.preco, novaSaida.id);
  }
});

function somarSaidas(movimentacoes) {
  const saidas = movimentacoes.filter((mov) => mov.tipo === "saida");
  return saidas.reduce(
    (total, saida) => total + (parseFloat(saida.preco) || 0),
    0
  );
}

window.somarSaidas = somarSaidas;
