const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome');
const mensagemInput = document.getElementById('mensagem');
const lista = document.getElementById('comentarios-lista');
const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

// =============================
//   TEMA
// =============================
toggleButton.addEventListener('click', () => {
  const lightMode = body.classList.toggle('light-mode');
  toggleButton.textContent = lightMode ? '☀️' : '🌙';
  toggleButton.setAttribute('aria-checked', lightMode);
});

// =============================
//   CARREGAR COMENTÁRIOS
// =============================
window.addEventListener('DOMContentLoaded', () => {
  const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosSalvos.forEach(c => mostrarComentario(c.nome, c.mensagem));
});

// =============================
//   FORMULÁRIO
// =============================
formulario.addEventListener('submit', e => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  if (!nome || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (mensagem.length > 300) {
    alert("A mensagem deve ter no máximo 300 caracteres.");
    return;
  }

  mostrarComentario(nome, mensagem);
  salvarComentario(nome, mensagem);

  formulario.reset();
});

// =============================
//   MOSTRAR COMENTÁRIO
// =============================
function mostrarComentario(nome, mensagem) {
  const div = document.createElement('div');
  div.classList.add('comentario');

  const strong = document.createElement('strong');
  strong.textContent = `${nome}: `;

  const p = document.createElement('p');
  p.textContent = mensagem;

  div.appendChild(strong);
  div.appendChild(p);
  lista.appendChild(div);
}

// =============================
//   SALVAR NO LOCALSTORAGE
// =============================
function salvarComentario(nome, mensagem) {
  const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentariosSalvos.push({ nome, mensagem });
  localStorage.setItem('comentarios', JSON.stringify(comentariosSalvos));
}

// =============================
//   PLAYER DE MÚSICA
// =============================
document.querySelectorAll('button[data-audio]').forEach(button => {
  button.addEventListener('click', () => {
    const audioId = button.getAttribute('data-audio');
    const audio = document.getElementById(audioId);

    if (audio.paused) {
      document.querySelectorAll('audio').forEach(a => a.pause());
      audio.play();
      button.textContent = "⏸️";
    } else {
      audio.pause();
      button.textContent = "▶";
    }
  });
});
