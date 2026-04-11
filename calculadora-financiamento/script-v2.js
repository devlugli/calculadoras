function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function aplicarExemploFinanciamento(valor, taxa, parcelas) {
  document.getElementById("valorFinanciado").value = valor;
  document.getElementById("taxaJuros").value = taxa;
  document.getElementById("parcelas").value = parcelas;
  calcular();
}

function calcular() {
  const valorFinanciado = parseFloat(document.getElementById("valorFinanciado").value) || 0;
  const taxaJuros = parseFloat(document.getElementById("taxaJuros").value) || 0;
  const parcelas = parseInt(document.getElementById("parcelas").value, 10) || 0;

  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const valorTotalPago = document.getElementById("valorTotalPago");
  const valorTotalJuros = document.getElementById("valorTotalJuros");

  if (valorFinanciado <= 0 || taxaJuros < 0 || parcelas <= 0) {
    resumoTopoTitulo.innerText = "Valor da parcela";
    resumoTopoValor.innerText = "R$ 0,00";
    resumoTopoTexto.innerText = "Informe valores validos para calcular.";
    valorTotalPago.innerText = "R$ 0,00";
    valorTotalJuros.innerText = "R$ 0,00";
    document.getElementById("percentualJurosPago").innerText = "0,00%";
    document.getElementById("compromissoMensal").innerText = "-";
    document.getElementById("financiamentoResumoCurto").innerText = "-";
    return;
  }

  const i = taxaJuros / 100;
  let parcela = 0;

  if (i === 0) {
    parcela = valorFinanciado / parcelas;
  } else {
    parcela = valorFinanciado * (i * Math.pow(1 + i, parcelas)) / (Math.pow(1 + i, parcelas) - 1);
  }

  const totalPago = parcela * parcelas;
  const totalJuros = totalPago - valorFinanciado;
  const percentualJuros = valorFinanciado > 0 ? (totalJuros / valorFinanciado) * 100 : 0;

  resumoTopoTitulo.innerText = "Valor estimado da parcela";
  resumoTopoValor.innerText = "R$ " + formatarNumero(parcela);
  resumoTopoTexto.innerText = `Em ${parcelas} parcelas, voce pagara aproximadamente R$ ${formatarNumero(totalPago)} no total.`;
  valorTotalPago.innerText = "R$ " + formatarNumero(totalPago);
  valorTotalJuros.innerText = "R$ " + formatarNumero(totalJuros);

  document.getElementById("percentualJurosPago").innerText = formatarNumero(percentualJuros) + "%";
  document.getElementById("compromissoMensal").innerText = "R$ " + formatarNumero(parcela) + " por mes";
  document.getElementById("financiamentoResumoCurto").innerText = `${parcelas}x a ${formatarNumero(taxaJuros)}% a.m.`;
  document.getElementById("notaResultadoFinanciamento").innerText =
    `Voce esta simulando R$ ${formatarNumero(valorFinanciado)} em ${parcelas} parcelas. Antes de fechar contrato, compare prazo, parcela e juros totais.`;
}

window.onload = function () {
  document.getElementById("valorFinanciado").addEventListener("input", calcular);
  document.getElementById("taxaJuros").addEventListener("input", calcular);
  document.getElementById("parcelas").addEventListener("input", calcular);
  calcular();
};
