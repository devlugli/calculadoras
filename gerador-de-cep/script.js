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

function gerarBase(tamanho) {
  let valor = "";
  for (let i = 0; i < tamanho; i++) {
    valor += Math.floor(Math.random() * 10);
  }
  return valor;
}

function formatarCep(cep) {
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
}

function gerarCep() {
  const cep = gerarBase(8);
  const usarMascara = document.getElementById("cepComMascara").value === "sim";
  document.getElementById("resumoTopoTitulo").innerText = "CEP gerado";
  document.getElementById("resumoTopoValor").innerText = usarMascara ? formatarCep(cep) : cep;
  document.getElementById("resumoTopoTexto").innerText = "CEP fictício para testes de endereço e formulários.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um CEP antes de copiar.";
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
  document.getElementById("cepComMascara").addEventListener("change", gerarCep);
  gerarCep();
};
