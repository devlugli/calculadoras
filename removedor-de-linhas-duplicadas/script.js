function removerDuplicadas() {
  const texto = document.getElementById("linhasEntrada").value;
  const linhas = texto.split(/\r?\n/);
  const vistas = new Set();
  const unicas = [];

  linhas.forEach((linha) => {
    if (!linha.trim()) return;
    if (!vistas.has(linha)) {
      vistas.add(linha);
      unicas.push(linha);
    }
  });

  const removidas = Math.max(linhas.filter((linha) => linha.trim()).length - unicas.length, 0);
  const resultado = unicas.join("\n");

  document.getElementById("linhasUnicas").value = resultado;
  document.getElementById("resumoTopoTitulo").innerText = "Linhas removidas";
  document.getElementById("resumoTopoValor").innerText = removidas.toLocaleString("pt-BR");
  document.getElementById("resumoTopoTexto").innerText = "As linhas repetidas foram eliminadas preservando a primeira ocorrência.";
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
  const campo = document.getElementById("linhasUnicas");
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
  document.getElementById("linhasEntrada").addEventListener("input", removerDuplicadas);
  removerDuplicadas();
};
