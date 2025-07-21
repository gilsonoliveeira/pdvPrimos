
function carregarModal(mensagem){
  const modalErro = document.getElementById('modal-erro');
  const paragrafo = modalErro.querySelector('p');

  paragrafo.textContent = mensagem;
  modalErro.style.display = 'flex';

}

window.carregarModal = carregarModal;

function fecharModal() {
  const modalErro = document.getElementById('modal-erro');
  modalErro.style.display = 'none';
}
