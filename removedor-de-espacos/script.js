function normalizarTexto(texto) {
  return texto
    .split(/\r?\n/)
    .map((linha) => linha.trim().replace(/\s+/g, " "))
    .filter((linha) => linha.length > 0)
    .join("\n");
}

function limparTexto() {
  const textoOriginal = document.getElementById("textoSujo").value;
  const textoLimpo = normalizarTexto(textoOriginal);
  const caracteresRemovidos = Math.max(textoOriginal.length - textoLimpo.length, 0);

  document.getElementById("textoLimpo").value = textoLimpo;
  document.getElementById("resumoTopoTitulo").innerText = "Caracteres removidos";
  document.getElementById("resumoTopoValor").innerText = caracteresRemovidos.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText =
    "O texto foi reorganizado removendo espaços repetidos e linhas vazias.";
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
  const campoResultado = document.getElementById("textoLimpo");
  const feedback = document.getElementById("copyFeedback");

  if (!campoResultado.value) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    campoResultado.value,
    () => {
      feedback.innerText = "Copiado com sucesso.";
      setTimeout(() => {
        feedback.innerText = "";
      }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}

window.onload = function () {
  document.getElementById("textoSujo").addEventListener("input", limparTexto);
  limparTexto();
};
