let ultimoUrlResultado = "";

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

function converterUrl() {
  const modo = document.getElementById("urlModo").value;
  const conteudo = document.getElementById("urlInput").value;

  if (!conteudo) {
    document.getElementById("urlStatusTitulo").innerText = "Preencha o conteúdo";
    document.getElementById("urlStatusTexto").innerText = "Nenhum valor foi informado ainda.";
    document.getElementById("urlOutput").value = "";
    ultimoUrlResultado = "";
    return;
  }

  try {
    const resultado = modo === "encode" ? encodeURIComponent(conteudo) : decodeURIComponent(conteudo);
    document.getElementById("urlStatusTitulo").innerText = modo === "encode" ? "Conteúdo codificado para URL" : "Conteúdo decodificado com sucesso";
    document.getElementById("urlStatusTexto").innerText = modo === "encode" ? "Resultado pronto para uso em parâmetro, query string ou link." : "Conteúdo original recuperado a partir da URL codificada.";
    document.getElementById("urlOutput").value = resultado;
    ultimoUrlResultado = resultado;
  } catch (error) {
    document.getElementById("urlStatusTitulo").innerText = "Conteúdo inválido";
    document.getElementById("urlStatusTexto").innerText = "Não foi possível converter o valor informado neste modo.";
    document.getElementById("urlOutput").value = "";
    ultimoUrlResultado = "";
  }
}

function limparUrl() {
  document.getElementById("urlInput").value = "";
  document.getElementById("urlOutput").value = "";
  document.getElementById("urlStatusTitulo").innerText = "Aguardando conteúdo";
  document.getElementById("urlStatusTexto").innerText = "Escolha o modo, cole o conteúdo e gere o resultado.";
  document.getElementById("copyFeedback").innerText = "";
  ultimoUrlResultado = "";
}

function copiarUrlResultado() {
  const feedback = document.getElementById("copyFeedback");
  if (!ultimoUrlResultado) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoUrlResultado,
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
