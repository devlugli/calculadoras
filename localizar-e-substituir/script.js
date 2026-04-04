function escaparRegex(valor) {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function substituirTexto() {
  const texto = document.getElementById("textoBase").value;
  const termoBusca = document.getElementById("termoBusca").value;
  const termoSubstituto = document.getElementById("termoSubstituto").value;

  if (!termoBusca) {
    document.getElementById("textoAtualizado").value = texto;
    document.getElementById("resumoTopoTitulo").innerText = "Substituições feitas";
    document.getElementById("resumoTopoValor").innerText = "0";
    document.getElementById("resumoTopoTexto").innerText = "Informe um termo para localizar no texto.";
    return;
  }

  const regex = new RegExp(escaparRegex(termoBusca), "g");
  const ocorrencias = (texto.match(regex) || []).length;
  const resultado = texto.replace(regex, termoSubstituto);

  document.getElementById("textoAtualizado").value = resultado;
  document.getElementById("resumoTopoTitulo").innerText = "Substituições feitas";
  document.getElementById("resumoTopoValor").innerText = ocorrencias.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = "O texto foi atualizado com a substituição informada.";
}

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

function copiarResultado() {
  const campo = document.getElementById("textoAtualizado");
  const feedback = document.getElementById("copyFeedback");
  if (!campo.value) {
    feedback.innerText = "Nada para copiar.";
    return;
  }
  copiarTextoComFallback(
    campo.value,
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
  document.getElementById("textoBase").addEventListener("input", substituirTexto);
  document.getElementById("termoBusca").addEventListener("input", substituirTexto);
  document.getElementById("termoSubstituto").addEventListener("input", substituirTexto);
  substituirTexto();
};
