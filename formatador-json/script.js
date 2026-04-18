let ultimoJsonResultado = "";

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

function atualizarResultadoJson(titulo, texto, resultado) {
  document.getElementById("jsonStatusTitulo").innerText = titulo;
  document.getElementById("jsonStatusTexto").innerText = texto;
  document.getElementById("jsonOutput").value = resultado;
  ultimoJsonResultado = resultado;
}

function obterJsonParseado() {
  const conteudo = document.getElementById("jsonInput").value.trim();

  if (!conteudo) {
    atualizarResultadoJson("Cole um JSON para começar", "Nenhum conteúdo foi informado ainda.", "");
    return null;
  }

  try {
    return JSON.parse(conteudo);
  } catch (error) {
    atualizarResultadoJson("JSON inválido", error.message, "");
    return null;
  }
}

function formatarJson() {
  const json = obterJsonParseado();
  if (json === null) return;
  atualizarResultadoJson("JSON válido", "Conteúdo formatado com indentação para leitura.", JSON.stringify(json, null, 2));
}

function minificarJson() {
  const json = obterJsonParseado();
  if (json === null) return;
  atualizarResultadoJson("JSON válido", "Conteúdo minificado com remoção de espaços desnecessários.", JSON.stringify(json));
}

function limparJson() {
  document.getElementById("jsonInput").value = "";
  atualizarResultadoJson("Aguardando conteúdo", "Cole um JSON válido ou inválido para validar, formatar ou minificar.", "");
  document.getElementById("copyFeedback").innerText = "";
}

function copiarJsonResultado() {
  const feedback = document.getElementById("copyFeedback");
  if (!ultimoJsonResultado) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoJsonResultado,
    () => {
      feedback.innerText = "Resultado copiado com sucesso.";
      setTimeout(() => {
        feedback.innerText = "";
      }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}
