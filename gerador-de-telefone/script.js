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

function gerarTelefone() {
  const tipo = document.getElementById("tipoTelefone").value;
  const ddd = 11 + Math.floor(Math.random() * 78);
  const prefixo = tipo === "celular"
    ? `9${1000 + Math.floor(Math.random() * 9000)}`
    : `${2000 + Math.floor(Math.random() * 7000)}`;
  const sufixo = `${1000 + Math.floor(Math.random() * 9000)}`;
  const telefone = `(${ddd}) ${prefixo}-${sufixo}`;

  document.getElementById("resumoTopoTitulo").innerText = "Telefone gerado";
  document.getElementById("resumoTopoValor").innerText = telefone;
  document.getElementById("resumoTopoTexto").innerText = `Número fictício do tipo ${tipo} para testes e cadastros.`;
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um telefone antes de copiar.";
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

window.onload = function () {
  document.getElementById("tipoTelefone").addEventListener("change", gerarTelefone);
  gerarTelefone();
};
