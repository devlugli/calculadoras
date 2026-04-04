function removerQuebras() {
  const texto = document.getElementById("textoQuebrado").value;
  const resultado = texto.replace(/\s*\r?\n\s*/g, " ").replace(/\s+/g, " ").trim();
  const removidas = (texto.match(/\r?\n/g) || []).length;

  document.getElementById("textoSemQuebras").value = resultado;
  document.getElementById("resumoTopoTitulo").innerText = "Quebras removidas";
  document.getElementById("resumoTopoValor").innerText = removidas.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = "O texto foi unido em uma linha contínua.";
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
  const campo = document.getElementById("textoSemQuebras");
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
  document.getElementById("textoQuebrado").addEventListener("input", removerQuebras);
  removerQuebras();
};
