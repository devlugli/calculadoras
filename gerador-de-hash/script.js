let ultimoHashResultado = "";

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

function bufferParaHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function gerarHash() {
  const algoritmo = document.getElementById("hashAlgoritmo").value;
  const conteudo = document.getElementById("hashInput").value;

  if (!conteudo) {
    document.getElementById("hashStatusTitulo").innerText = "Preencha o conteúdo";
    document.getElementById("hashStatusTexto").innerText = "Nenhum valor foi informado ainda.";
    document.getElementById("hashOutput").value = "";
    ultimoHashResultado = "";
    return;
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(conteudo);
    const digest = await crypto.subtle.digest(algoritmo, data);
    const resultado = bufferParaHex(digest);

    document.getElementById("hashStatusTitulo").innerText = `Hash gerado com ${algoritmo}`;
    document.getElementById("hashStatusTexto").innerText = "Resultado calculado localmente no navegador.";
    document.getElementById("hashOutput").value = resultado;
    ultimoHashResultado = resultado;
  } catch (error) {
    document.getElementById("hashStatusTitulo").innerText = "Não foi possível gerar o hash";
    document.getElementById("hashStatusTexto").innerText = "Seu navegador não suportou a operação ou houve erro ao processar o conteúdo.";
    document.getElementById("hashOutput").value = "";
    ultimoHashResultado = "";
  }
}

function limparHash() {
  document.getElementById("hashInput").value = "";
  document.getElementById("hashOutput").value = "";
  document.getElementById("hashStatusTitulo").innerText = "Aguardando conteúdo";
  document.getElementById("hashStatusTexto").innerText = "Escolha um algoritmo, informe o conteúdo e gere o hash.";
  document.getElementById("copyFeedback").innerText = "";
  ultimoHashResultado = "";
}

function copiarHashResultado() {
  const feedback = document.getElementById("copyFeedback");
  if (!ultimoHashResultado) {
    feedback.innerText = "Nada para copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoHashResultado,
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
