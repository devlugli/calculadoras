const jwtPartesCopiaveis = {
  header: "",
  payload: ""
};

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

function base64UrlParaUtf8(valor) {
  const base64 = valor.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  return decodeURIComponent(escape(atob(base64 + padding)));
}

function decodificarParteJwt(parte) {
  return JSON.stringify(JSON.parse(base64UrlParaUtf8(parte)), null, 2);
}

function decodificarJwt() {
  const token = (document.getElementById("jwtInput").value || "").trim();

  if (!token) {
    document.getElementById("jwtStatusTitulo").innerText = "Cole um token JWT";
    document.getElementById("jwtStatusTexto").innerText = "Nenhum token foi informado ainda.";
    document.getElementById("jwtHeader").value = "";
    document.getElementById("jwtPayload").value = "";
    jwtPartesCopiaveis.header = "";
    jwtPartesCopiaveis.payload = "";
    return;
  }

  const partes = token.split(".");

  if (partes.length < 2) {
    document.getElementById("jwtStatusTitulo").innerText = "Token inválido";
    document.getElementById("jwtStatusTexto").innerText = "O conteúdo informado não parece um JWT no formato header.payload.signature.";
    document.getElementById("jwtHeader").value = "";
    document.getElementById("jwtPayload").value = "";
    jwtPartesCopiaveis.header = "";
    jwtPartesCopiaveis.payload = "";
    return;
  }

  try {
    const header = decodificarParteJwt(partes[0]);
    const payload = decodificarParteJwt(partes[1]);

    document.getElementById("jwtStatusTitulo").innerText = "Token decodificado com sucesso";
    document.getElementById("jwtStatusTexto").innerText = "Header e payload foram abertos em formato legível. A assinatura não foi validada.";
    document.getElementById("jwtHeader").value = header;
    document.getElementById("jwtPayload").value = payload;
    jwtPartesCopiaveis.header = header;
    jwtPartesCopiaveis.payload = payload;
  } catch (error) {
    document.getElementById("jwtStatusTitulo").innerText = "Não foi possível decodificar";
    document.getElementById("jwtStatusTexto").innerText = "Uma das partes do token não está em um formato Base64URL/JSON válido.";
    document.getElementById("jwtHeader").value = "";
    document.getElementById("jwtPayload").value = "";
    jwtPartesCopiaveis.header = "";
    jwtPartesCopiaveis.payload = "";
  }
}

function limparJwt() {
  document.getElementById("jwtInput").value = "";
  document.getElementById("jwtHeader").value = "";
  document.getElementById("jwtPayload").value = "";
  document.getElementById("jwtStatusTitulo").innerText = "Aguardando token";
  document.getElementById("jwtStatusTexto").innerText = "Cole um JWT para abrir header e payload.";
  document.getElementById("copyFeedback").innerText = "";
  jwtPartesCopiaveis.header = "";
  jwtPartesCopiaveis.payload = "";
}

function copiarJwtParte(parte) {
  const feedback = document.getElementById("copyFeedback");
  const conteudo = jwtPartesCopiaveis[parte];

  if (!conteudo) {
    feedback.innerText = "Nada para copiar nesta parte.";
    return;
  }

  copiarTextoComFallback(
    conteudo,
    () => {
      feedback.innerText = `${parte === "header" ? "Header" : "Payload"} copiado com sucesso.`;
      setTimeout(() => {
        feedback.innerText = "";
      }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}
