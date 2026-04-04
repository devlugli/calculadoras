function escaparHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function converterComParagrafos(texto) {
  return texto
    .trim()
    .split(/\n\s*\n/)
    .map((bloco) => `<p>${escaparHtml(bloco).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

function converterComQuebras(texto) {
  return escaparHtml(texto).replace(/\n/g, "<br>\n");
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

function converterParaHtml() {
  const texto = document.getElementById("textoOriginal").value;
  const modo = document.getElementById("modoHtml").value;
  const resultado = modo === "paragrafos" ? converterComParagrafos(texto) : converterComQuebras(texto);

  document.getElementById("htmlConvertido").value = resultado;
  document.getElementById("resumoTopoTitulo").innerText = "HTML gerado";
  document.getElementById("resumoTopoValor").innerText = resultado.length.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText =
    "O texto foi convertido para HTML pronto para copiar e usar.";
}

function copiarResultado() {
  const campoResultado = document.getElementById("htmlConvertido");
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
  document.getElementById("textoOriginal").addEventListener("input", converterParaHtml);
  document.getElementById("modoHtml").addEventListener("change", converterParaHtml);
  converterParaHtml();
};
