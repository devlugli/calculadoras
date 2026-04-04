function capitalizarPalavras(texto) {
  return texto.replace(/\S+/g, (palavra) =>
    palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
  );
}

function primeiraLetraDaFrase(texto) {
  const textoBase = texto.toLowerCase();
  return textoBase.replace(/(^\s*\w|[.!?]\s+\w)/g, (trecho) => trecho.toUpperCase());
}

function obterTextoConvertido(texto, modo) {
  if (modo === "maiusculas") return texto.toUpperCase();
  if (modo === "minusculas") return texto.toLowerCase();
  if (modo === "capitalizado") return capitalizarPalavras(texto);
  return primeiraLetraDaFrase(texto);
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

function converterTexto() {
  const texto = document.getElementById("textoOriginal").value;
  const modo = document.getElementById("modoConversao").value;
  const textoConvertido = obterTextoConvertido(texto, modo);

  document.getElementById("textoConvertido").value = textoConvertido;
  document.getElementById("resumoTopoTitulo").innerText = "Texto convertido";
  document.getElementById("resumoTopoValor").innerText = textoConvertido.length.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText =
    "Resultado gerado automaticamente no formato selecionado.";
}

function copiarResultado() {
  const campoResultado = document.getElementById("textoConvertido");
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
  document.getElementById("textoOriginal").addEventListener("input", converterTexto);
  document.getElementById("modoConversao").addEventListener("change", converterTexto);
  converterTexto();
};
