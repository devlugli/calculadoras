function calcularDigitoCnpj(base, pesos) {
  let soma = 0;
  for (let i = 0; i < pesos.length; i++) {
    soma += Number(base[i]) * pesos[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function formatarCnpj(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
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

function gerarCnpj() {
  let base = "";
  for (let i = 0; i < 8; i++) {
    base += Math.floor(Math.random() * 10);
  }
  base += "0001";
  const digito1 = calcularDigitoCnpj(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digito2 = calcularDigitoCnpj(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cnpjLimpo = `${base}${digito1}${digito2}`;
  const usarMascara = document.getElementById("cnpjComMascara").value === "sim";
  const cnpjFinal = usarMascara ? formatarCnpj(cnpjLimpo) : cnpjLimpo;

  document.getElementById("resumoTopoTitulo").innerText = "CNPJ gerado";
  document.getElementById("resumoTopoValor").innerText = cnpjFinal;
  document.getElementById("resumoTopoTexto").innerText = "Número válido para fins de teste e desenvolvimento.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um CNPJ antes de copiar.";
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
  document.getElementById("cnpjComMascara").addEventListener("change", gerarCnpj);
  gerarCnpj();
};
