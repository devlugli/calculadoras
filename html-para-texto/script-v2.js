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

function atualizarMetricas(texto) {
  const palavras = texto ? texto.split(/\s+/).filter(Boolean).length : 0;
  const linhas = texto ? texto.split(/\n/).filter((linha) => linha.trim() !== "").length : 0;
  document.getElementById("contadorPalavras").innerText = palavras.toLocaleString("pt-BR");
  document.getElementById("contadorLinhas").innerText = linhas.toLocaleString("pt-BR");
  document.getElementById("htmlStatus").innerText = texto ? "Convertido" : "Pronto";
}

function converterHtmlParaTexto() {
  const html = document.getElementById("htmlOriginal").value;
  const htmlNormalizado = adicionarQuebrasEmBlocos(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlNormalizado, "text/html");
  const texto = limparEspacosTexto(doc.body.textContent || "");

  document.getElementById("textoExtraido").value = texto;
  document.getElementById("resumoTopoTitulo").innerText = "Caracteres extraidos";
  document.getElementById("resumoTopoValor").innerText = texto.length.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = texto
    ? "O conteudo HTML foi convertido em texto simples."
    : "Cole um trecho HTML para extrair o texto limpo.";
  atualizarMetricas(texto);
}

function preencherExemploHtml() {
  document.getElementById("htmlOriginal").value = "<section><h2>Oferta especial</h2><p>Ganhe <strong>20%</strong> de desconto hoje.</p><ul><li>Frete gratis</li><li>Pagamento em ate 3x</li></ul></section>";
  converterHtmlParaTexto();
}

function limparCamposHtml() {
  document.getElementById("htmlOriginal").value = "";
  document.getElementById("textoExtraido").value = "";
  document.getElementById("copyFeedback").innerText = "";
  converterHtmlParaTexto();
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
      feedback.innerText = "Nao foi possivel copiar automaticamente.";
    }
  );
}

window.onload = function () {
  document.getElementById("htmlOriginal").addEventListener("input", converterHtmlParaTexto);
  converterHtmlParaTexto();
};
