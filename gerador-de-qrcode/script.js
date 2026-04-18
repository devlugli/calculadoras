const gruposQr = {
  url: document.getElementById("grupoUrl"),
  text: document.getElementById("grupoTexto"),
  wifi: document.getElementById("grupoWifi"),
  email: document.getElementById("grupoEmail"),
  phone: document.getElementById("grupoTelefone"),
  whatsapp: document.getElementById("grupoWhatsapp")
};

let ultimoConteudoGerado = "";

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

function normalizarNumero(valor) {
  return valor.replace(/\D/g, "");
}

function mostrarGrupoQr(tipo) {
  Object.entries(gruposQr).forEach(([chave, elemento]) => {
    if (!elemento) {
      return;
    }

    elemento.hidden = chave !== tipo;
  });
}

function montarConteudoQr() {
  const tipo = document.getElementById("tipoQr").value;

  if (tipo === "url") {
    return (document.getElementById("qrUrl").value || "").trim();
  }

  if (tipo === "text") {
    return (document.getElementById("qrTexto").value || "").trim();
  }

  if (tipo === "wifi") {
    const nome = (document.getElementById("wifiNome").value || "").trim();
    const senha = (document.getElementById("wifiSenha").value || "").trim();
    const seguranca = document.getElementById("wifiTipo").value;

    if (!nome) {
      return "";
    }

    const senhaFinal = seguranca === "nopass" ? "" : senha;
    return `WIFI:T:${seguranca};S:${nome};P:${senhaFinal};;`;
  }

  if (tipo === "email") {
    const destino = (document.getElementById("emailDestino").value || "").trim();
    const assunto = (document.getElementById("emailAssunto").value || "").trim();
    const mensagem = (document.getElementById("emailMensagem").value || "").trim();

    if (!destino) {
      return "";
    }

    const parametros = new URLSearchParams();

    if (assunto) {
      parametros.set("subject", assunto);
    }

    if (mensagem) {
      parametros.set("body", mensagem);
    }

    const query = parametros.toString();
    return query ? `mailto:${destino}?${query}` : `mailto:${destino}`;
  }

  if (tipo === "phone") {
    const numero = normalizarNumero(document.getElementById("telefoneNumero").value || "");
    return numero ? `tel:+${numero}` : "";
  }

  const numeroWhatsapp = normalizarNumero(document.getElementById("whatsNumero").value || "");
  const mensagemWhatsapp = (document.getElementById("whatsMensagem").value || "").trim();

  if (!numeroWhatsapp) {
    return "";
  }

  const parametrosWhatsapp = new URLSearchParams();

  if (mensagemWhatsapp) {
    parametrosWhatsapp.set("text", mensagemWhatsapp);
  }

  const queryWhatsapp = parametrosWhatsapp.toString();
  return queryWhatsapp ? `https://wa.me/${numeroWhatsapp}?${queryWhatsapp}` : `https://wa.me/${numeroWhatsapp}`;
}

function descreverTipoQr(tipo) {
  const descricoes = {
    url: "QR Code para abrir um link ou página.",
    text: "QR Code para mostrar um texto livre.",
    wifi: "QR Code para conectar em uma rede Wi-Fi.",
    email: "QR Code para abrir um e-mail com campos preenchidos.",
    phone: "QR Code para iniciar uma ligação.",
    whatsapp: "QR Code para abrir uma conversa no WhatsApp."
  };

  return descricoes[tipo] || "QR Code gerado.";
}

function gerarQrCode() {
  const tipo = document.getElementById("tipoQr").value;
  const conteudo = montarConteudoQr();
  const tamanho = document.getElementById("qrTamanho").value;
  const margem = document.getElementById("qrMargem").value;
  const feedback = document.getElementById("copyFeedback");
  const placeholder = document.getElementById("qrPlaceholder");
  const preview = document.getElementById("qrPreview");
  const resumoTitulo = document.getElementById("qrResumoTitulo");
  const resumoTexto = document.getElementById("qrResumoTexto");
  const download = document.getElementById("qrDownload");

  feedback.innerText = "";

  if (!conteudo) {
    resumoTitulo.innerText = "Preencha os dados para gerar o QR";
    resumoTexto.innerText = "O conteúdo do QR depende do tipo escolhido. Complete os campos visíveis e tente novamente.";
    preview.hidden = true;
    placeholder.hidden = false;
    download.hidden = true;
    ultimoConteudoGerado = "";
    return;
  }

  const imagemUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&margin=${margem}&data=${encodeURIComponent(conteudo)}`;

  preview.src = imagemUrl;
  preview.hidden = false;
  placeholder.hidden = true;
  download.href = imagemUrl;
  download.hidden = false;
  download.textContent = "Baixar PNG";

  resumoTitulo.innerText = document.getElementById("tipoQr").selectedOptions[0].text;
  resumoTexto.innerText = descreverTipoQr(tipo);
  ultimoConteudoGerado = conteudo;
}

function copiarConteudoQr() {
  const feedback = document.getElementById("copyFeedback");

  if (!ultimoConteudoGerado) {
    feedback.innerText = "Gere um QR Code antes de copiar o conteúdo.";
    return;
  }

  copiarTextoComFallback(
    ultimoConteudoGerado,
    () => {
      feedback.innerText = "Conteúdo do QR copiado com sucesso.";
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
  const seletorTipo = document.getElementById("tipoQr");
  seletorTipo.addEventListener("change", () => {
    mostrarGrupoQr(seletorTipo.value);
  });

  mostrarGrupoQr(seletorTipo.value);
};
