let ultimoBase64Resultado = "";

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

function utf8ParaBase64(texto) {
  return btoa(unescape(encodeURIComponent(texto)));
}

function base64ParaUtf8(base64) {
  return decodeURIComponent(escape(atob(base64)));
}

function converterBase64() {
  const modo = document.getElementById("base64Modo").value;
  const conteudo = document.getElementById("base64Input").value;

  if (!conteudo) {
    document.getElementById("base64StatusTitulo").innerText = "Preencha o conteúdo";
    document.getElementById("base64StatusTexto").innerText = "Nenhum valor foi informado ainda.";
    document.getElementById("base64Output").value = "";
    ultimoBase64Resultado = "";
    return;
  }

  try {
    const resultado = modo === "encode" ? utf8ParaBase64(conteudo) : base64ParaUtf8(conteudo.trim());
    document.getElementById("base64StatusTitulo").innerText = modo === "encode" ? "Texto convertido para Base64" : "Base64 decodificado com sucesso";
    document.getElementById("base64StatusTexto").innerText = modo === "encode" ? "Conteúdo codificado para uso técnico e transporte." : "Conteúdo original recuperado a partir do Base64 informado.";
    document.getElementById("base64Output").value = resultado;
    ultimoBase64Resultado = resultado;
  } catch (error) {
    document.getElementById("base64StatusTitulo").innerText = "Conteúdo inválido";
    document.getElementById("base64StatusTexto").innerText = "Não foi possível converter o valor informado neste modo.";
    document.getElementById("base64Output").value = "";
    ultimoBase64Resultado = "";
  }
}

function limparBase64() {
  document.getElementById("base64Input").value = "";
  document.getElementById("base64Output").value = "";
  document.getElementById("base64StatusTitulo").innerText = "Aguardando conteúdo";
  document.getElementById("base64StatusTexto").innerText = "Escolha o modo, cole o conteúdo e gere o resultado.";
  document.getElementById("copyFeedback").innerText = "";
  ultimoBase64Resultado = "";
}

function copiarBase64Resultado() {
  const feedback = document.getElementById("copyFeedback");
  if (!ultimoBase64Resultado) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoBase64Resultado,
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
