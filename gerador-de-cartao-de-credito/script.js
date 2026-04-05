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

const cartoes = {
  visa: { prefixo: "4", tamanho: 16, nome: "Visa" },
  mastercard: { prefixo: "51", tamanho: 16, nome: "Mastercard" },
  amex: { prefixo: "34", tamanho: 15, nome: "American Express" }
};

function gerarNumeroAleatorio(tamanho) {
  let resultado = "";
  for (let i = 0; i < tamanho; i++) {
    resultado += Math.floor(Math.random() * 10);
  }
  return resultado;
}

function calcularDigitoLuhn(numeroParcial) {
  let soma = 0;
  let dobrar = true;
  for (let i = numeroParcial.length - 1; i >= 0; i--) {
    let digito = Number(numeroParcial[i]);
    if (dobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    soma += digito;
    dobrar = !dobrar;
  }
  return (10 - (soma % 10)) % 10;
}

function formatarCartao(numero, usarMascara) {
  if (!usarMascara) return numero;
  return numero.match(/.{1,4}/g).join(" ");
}

function gerarCartao() {
  const bandeira = document.getElementById("bandeiraCartao").value;
  const usarMascara = document.getElementById("cartaoComMascara").value === "sim";
  const config = cartoes[bandeira];
  const base = config.prefixo + gerarNumeroAleatorio(config.tamanho - config.prefixo.length - 1);
  const digito = calcularDigitoLuhn(base);
  const numero = `${base}${digito}`;
  const validadeMes = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const validadeAno = String(new Date().getFullYear() + 1 + Math.floor(Math.random() * 5)).slice(-2);
  const cvv = gerarNumeroAleatorio(bandeira === "amex" ? 4 : 3);

  document.getElementById("resumoTopoTitulo").innerText = `Cartão ${config.nome}`;
  document.getElementById("resumoTopoValor").innerText = formatarCartao(numero, usarMascara);
  document.getElementById("resumoTopoTexto").innerText = "Número gerado para fluxos de teste e simulações.";
  document.getElementById("resultadoValidade").innerText = `${validadeMes}/${validadeAno}`;
  document.getElementById("resultadoCvv").innerText = cvv;
}

function copiarResultado() {
  const numero = document.getElementById("resumoTopoValor").innerText;
  const validade = document.getElementById("resultadoValidade").innerText;
  const cvv = document.getElementById("resultadoCvv").innerText;
  const feedback = document.getElementById("copyFeedback");
  if (!numero) {
    feedback.innerText = "Gere um cartão antes de copiar.";
    return;
  }
  const texto = `Cartão: ${numero}\nValidade: ${validade}\nCVV: ${cvv}`;
  copiarTextoComFallback(
    texto,
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
  document.getElementById("bandeiraCartao").addEventListener("change", gerarCartao);
  document.getElementById("cartaoComMascara").addEventListener("change", gerarCartao);
  gerarCartao();
};
