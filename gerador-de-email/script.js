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

const nomesBase = ["lucas", "ana", "maria", "gustavo", "carla", "pedro", "beatriz", "renato", "camila", "joao"];
const sobrenomesBase = ["silva", "souza", "oliveira", "costa", "pereira", "almeida", "rodrigues", "gomes"];

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function gerarEmail() {
  const dominio = document.getElementById("dominioEmail").value;
  const numero = 10 + Math.floor(Math.random() * 900);
  const email = `${escolher(nomesBase)}.${escolher(sobrenomesBase)}${numero}@${dominio}`;
  document.getElementById("resumoTopoTitulo").innerText = "E-mail gerado";
  document.getElementById("resumoTopoValor").innerText = email;
  document.getElementById("resumoTopoTexto").innerText = "Endereço fictício pronto para testes e cadastros.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um e-mail antes de copiar.";
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
  document.getElementById("dominioEmail").addEventListener("change", gerarEmail);
  gerarEmail();
};
