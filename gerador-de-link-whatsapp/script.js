let ultimoLinkWhatsapp = "";

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

function gerarLinkWhatsapp() {
  const numero = (document.getElementById("whatsPais").value || "").replace(/\D/g, "");
  const mensagem = (document.getElementById("whatsTexto").value || "").trim();
  const titulo = document.getElementById("resultadoWhatsappTitulo");
  const texto = document.getElementById("resultadoWhatsappTexto");
  const blocoLink = document.getElementById("resultadoWhatsappLink");
  const botaoAbrir = document.getElementById("abrirWhatsapp");
  const feedback = document.getElementById("copyFeedback");

  feedback.innerText = "";

  if (!numero) {
    titulo.innerText = "Digite um número válido";
    texto.innerText = "Use DDI e DDD para montar um link que abra corretamente em celular e desktop.";
    blocoLink.innerText = "Nenhum link disponível.";
    botaoAbrir.hidden = true;
    ultimoLinkWhatsapp = "";
    return;
  }

  const parametros = new URLSearchParams();

  if (mensagem) {
    parametros.set("text", mensagem);
  }

  const query = parametros.toString();
  ultimoLinkWhatsapp = query ? `https://wa.me/${numero}?${query}` : `https://wa.me/${numero}`;

  titulo.innerText = "Link gerado com sucesso";
  texto.innerText = "Use este link em botão, bio, anúncio, assinatura ou leve para o gerador de QR Code.";
  blocoLink.innerText = ultimoLinkWhatsapp;
  botaoAbrir.href = ultimoLinkWhatsapp;
  botaoAbrir.hidden = false;
}

function copiarLinkWhatsapp() {
  const feedback = document.getElementById("copyFeedback");

  if (!ultimoLinkWhatsapp) {
    feedback.innerText = "Gere o link antes de copiar.";
    return;
  }

  copiarTextoComFallback(
    ultimoLinkWhatsapp,
    () => {
      feedback.innerText = "Link copiado com sucesso.";
      setTimeout(() => {
        feedback.innerText = "";
      }, 1500);
    },
    () => {
      feedback.innerText = "Não foi possível copiar automaticamente.";
    }
  );
}
