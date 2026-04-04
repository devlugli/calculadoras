function contarPalavras(texto) {
  const palavras = texto.trim().match(/\S+/g);
  return palavras ? palavras.length : 0;
}

function contarLinhas(texto) {
  if (!texto) return 0;
  return texto.split(/\r?\n/).length;
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

function analisarTexto() {
  const texto = document.getElementById("textoEntrada").value;
  const caracteres = texto.length;
  const palavras = contarPalavras(texto);
  const linhas = contarLinhas(texto);
  const semEspacos = texto.replace(/\s/g, "").length;

  document.getElementById("resumoTopoTitulo").innerText = "Total de caracteres";
  document.getElementById("resumoTopoValor").innerText = caracteres.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText =
    `Seu texto tem ${palavras} palavra(s), ${linhas} linha(s) e ${semEspacos} caractere(s) sem espaços.`;

  document.getElementById("resultadoPalavras").innerText = palavras.toLocaleString("pt-BR");
  document.getElementById("resultadoLinhas").innerText = linhas.toLocaleString("pt-BR");
  document.getElementById("resultadoSemEspacos").innerText = semEspacos.toLocaleString("pt-BR");
}

window.onload = function () {
  document.getElementById("textoEntrada").addEventListener("input", analisarTexto);
  analisarTexto();
};
