function ordenarLinhas() {
  const texto = document.getElementById("linhasTexto").value;
  const ordem = document.getElementById("ordemLinhas").value;
  const linhas = texto
    .split(/\r?\n/)
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0);

  linhas.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));

  if (ordem === "desc") {
    linhas.reverse();
  }

  const resultado = linhas.join("\n");

  document.getElementById("linhasOrdenadas").value = resultado;
  document.getElementById("resumoTopoTitulo").innerText = "Linhas ordenadas";
  document.getElementById("resumoTopoValor").innerText = linhas.length.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = "As linhas foram organizadas na ordem selecionada.";
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
  const campo = document.getElementById("linhasOrdenadas");
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
  document.getElementById("linhasTexto").addEventListener("input", ordenarLinhas);
  document.getElementById("ordemLinhas").addEventListener("change", ordenarLinhas);
  ordenarLinhas();
};
