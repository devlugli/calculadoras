function gerarUuidV4() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (caractere) {
    const aleatorio = Math.random() * 16 | 0;
    const valor = caractere === "x" ? aleatorio : (aleatorio & 0x3 | 0x8);
    return valor.toString(16);
  });
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

function gerarUuid() {
  const uuid = gerarUuidV4();
  document.getElementById("resumoTopoTitulo").innerText = "UUID gerado";
  document.getElementById("resumoTopoValor").innerText = uuid;
  document.getElementById("resumoTopoTexto").innerText = "Identificador único pronto para copiar e usar.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um UUID antes de copiar.";
    return;
  }
  copiarTextoComFallback(
    valor,
    () => {
      feedback.innerText = "Copiado com sucesso.";
      setTimeout(() => { feedback.innerText = ""; }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}

window.onload = gerarUuid;
