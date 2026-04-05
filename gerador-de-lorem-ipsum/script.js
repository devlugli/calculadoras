function copiarTextoComFallback(texto, onSuccess, onFailure) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(onSuccess).catch(onFailure);
    return;
  }
  const areaTemporaria = document.createElement("textarea");
  areaTemporaria.value = texto;
  areaTemporaria.setAttribute("readonly", "");
  areaTemporaria.style.position = "absolute";
  areaTemporaria.style.left = "-9999px";
  document.body.appendChild(areaTemporaria);
  areaTemporaria.select();
  try {
    document.execCommand("copy");
    onSuccess();
  } catch (error) {
    onFailure(error);
  } finally {
    document.body.removeChild(areaTemporaria);
  }
}

const frasesLorem = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  "Sed posuere consectetur est at lobortis.",
  "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
  "Donec ullamcorper nulla non metus auctor fringilla.",
  "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
  "Nulla vitae elit libero, a pharetra augue.",
  "Maecenas sed diam eget risus varius blandit sit amet non magna."
];

function escolherFrase() {
  return frasesLorem[Math.floor(Math.random() * frasesLorem.length)];
}

function gerarParagrafo() {
  const tamanho = 3 + Math.floor(Math.random() * 3);
  const frases = [];
  for (let i = 0; i < tamanho; i++) {
    frases.push(escolherFrase());
  }
  return frases.join(" ");
}

function gerarLorem() {
  const quantidade = Math.max(1, Math.min(10, Number(document.getElementById("quantidadeParagrafos").value) || 1));
  const paragrafos = [];
  for (let i = 0; i < quantidade; i++) {
    paragrafos.push(gerarParagrafo());
  }
  const texto = paragrafos.join("\n\n");
  document.getElementById("resumoTopoTitulo").innerText = "Texto gerado";
  document.getElementById("resumoTopoValor").innerText = `${quantidade} parágrafo(s)`;
  document.getElementById("resumoTopoTexto").innerText = "Conteúdo temporário pronto para layout, design e protótipos.";
  document.getElementById("resultadoLorem").value = texto;
}

function copiarResultado() {
  const valor = document.getElementById("resultadoLorem").value;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere o texto antes de copiar.";
    return;
  }
  copiarTextoComFallback(
    valor,
    () => {
      feedback.innerText = "Copiado com sucesso.";
      setTimeout(() => { feedback.innerText = ""; }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}

window.onload = function () {
  document.getElementById("quantidadeParagrafos").addEventListener("change", gerarLorem);
  gerarLorem();
};
