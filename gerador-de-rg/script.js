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

function formatarRg(rg) {
  return rg.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, "$1.$2.$3-$4");
}

function gerarRg() {
  const base = gerarBase(8);
  const digito = Math.random() > 0.9 ? "X" : String(Math.floor(Math.random() * 10));
  const rg = `${base}${digito}`;
  const usarMascara = document.getElementById("rgComMascara").value === "sim";
  document.getElementById("resumoTopoTitulo").innerText = "RG gerado";
  document.getElementById("resumoTopoValor").innerText = usarMascara ? formatarRg(rg) : rg;
  document.getElementById("resumoTopoTexto").innerText = "Número fictício em formato brasileiro para testes.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um RG antes de copiar.";
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
  document.getElementById("rgComMascara").addEventListener("change", gerarRg);
  gerarRg();
};
