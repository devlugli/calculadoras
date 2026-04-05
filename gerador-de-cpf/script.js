function gerarDigitoCpf(base) {
  let soma = 0;
  for (let i = 0; i < base.length; i++) {
    soma += Number(base[i]) * ((base.length + 1) - i);
  }
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
}

function formatarCpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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

function gerarCpf() {
  let base = "";
  for (let i = 0; i < 9; i++) {
    base += Math.floor(Math.random() * 10);
  }
  const digito1 = gerarDigitoCpf(base);
  const digito2 = gerarDigitoCpf(base + digito1);
  const cpfLimpo = `${base}${digito1}${digito2}`;
  const usarMascara = document.getElementById("cpfComMascara").value === "sim";
  const cpfFinal = usarMascara ? formatarCpf(cpfLimpo) : cpfLimpo;

  document.getElementById("resumoTopoTitulo").innerText = "CPF gerado";
  document.getElementById("resumoTopoValor").innerText = cpfFinal;
  document.getElementById("resumoTopoTexto").innerText = "Número válido para fins de teste e desenvolvimento.";
}

function copiarResultado() {
  const valor = document.getElementById("resumoTopoValor").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!valor) {
    feedback.innerText = "Gere um CPF antes de copiar.";
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
  document.getElementById("cpfComMascara").addEventListener("change", gerarCpf);
  gerarCpf();
};
