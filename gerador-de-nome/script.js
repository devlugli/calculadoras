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

const nomesMasculinos = ["Lucas", "Mateus", "João", "Pedro", "Gustavo", "Rafael", "Bruno", "Thiago"];
const nomesFemininos = ["Ana", "Mariana", "Juliana", "Camila", "Larissa", "Fernanda", "Beatriz", "Aline"];
const sobrenomes = ["Silva", "Souza", "Oliveira", "Costa", "Pereira", "Rodrigues", "Almeida", "Gomes"];

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function gerarNome() {
  const perfil = document.getElementById("perfilNome").value;
  const base = perfil === "feminino"
    ? nomesFemininos
    : perfil === "masculino"
      ? nomesMasculinos
      : [...nomesMasculinos, ...nomesFemininos];
  const nome = `${escolher(base)} ${escolher(sobrenomes)} ${escolher(sobrenomes)}`;

  document.getElementById("resumoTopoTitulo").innerText = "Nome gerado";
  document.getElementById("resumoTopoValor").innerText = nome;
  document.getElementById("resumoTopoTexto").innerText = `Nome fictício do perfil ${perfil}.`;
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um nome antes de copiar.";
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
  document.getElementById("perfilNome").addEventListener("change", gerarNome);
  gerarNome();
};
