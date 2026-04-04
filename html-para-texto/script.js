function limparEspacosTexto(texto) {
  return texto
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function adicionarQuebrasEmBlocos(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|li|ul|ol|h1|h2|h3|h4|h5|h6)>/gi, "</$1>\n");
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

function converterHtmlParaTexto() {
  const html = document.getElementById("htmlOriginal").value;
  const htmlNormalizado = adicionarQuebrasEmBlocos(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlNormalizado, "text/html");
  const texto = limparEspacosTexto(doc.body.textContent || "");

  document.getElementById("textoExtraido").value = texto;
  document.getElementById("resumoTopoTitulo").innerText = "Caracteres extraídos";
  document.getElementById("resumoTopoValor").innerText = texto.length.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = "O conteúdo HTML foi convertido em texto simples.";
}

function copiarResultado() {
  const campo = document.getElementById("textoExtraido");
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
  document.getElementById("htmlOriginal").addEventListener("input", converterHtmlParaTexto);
  converterHtmlParaTexto();
};
