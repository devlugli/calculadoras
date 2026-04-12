function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatNumber(value, digits = 2) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}

function calcularParcela(valor, taxaPercentual, parcelas) {
  const taxa = taxaPercentual / 100;
  if (taxa === 0) {
    return valor / parcelas;
  }
  return valor * taxa / (1 - Math.pow(1 + taxa, -parcelas));
}

function aplicarExemplo(valor, taxa, parcelas) {
  document.getElementById("valorEmprestimo").value = valor;
  document.getElementById("taxaMensal").value = taxa;
  document.getElementById("parcelas").value = parcelas;
  calcular();
}

function calcular() {
  const valor = Number(document.getElementById("valorEmprestimo").value);
  const taxa = Number(document.getElementById("taxaMensal").value);
  const parcelas = Number(document.getElementById("parcelas").value);

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const totalPago = document.getElementById("totalPago");
  const totalPagoTexto = document.getElementById("totalPagoTexto");
  const totalJuros = document.getElementById("totalJuros");
  const totalJurosTexto = document.getElementById("totalJurosTexto");
  const detalheResumo = document.getElementById("detalheResumo");
  const detalheResumoTexto = document.getElementById("detalheResumoTexto");

  if (!Number.isFinite(valor) || !Number.isFinite(taxa) || !Number.isFinite(parcelas) || valor <= 0 || parcelas <= 0 || taxa < 0) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe valor, taxa e parcelas validos para simular.";
    totalPago.innerText = "-";
    totalPagoTexto.innerText = "A soma das parcelas aparecera aqui.";
    totalJuros.innerText = "-";
    totalJurosTexto.innerText = "O custo total em juros aparecera aqui.";
    detalheResumo.innerText = "-";
    detalheResumoTexto.innerText = "Use a simulacao para comparar cenarios de prazo e taxa.";
    return;
  }

  const parcela = calcularParcela(valor, taxa, parcelas);
  const valorTotal = parcela * parcelas;
  const jurosTotais = valorTotal - valor;
  const percentualJuros = valor === 0 ? 0 : (jurosTotais / valor) * 100;

  resumoTopoValor.innerText = formatCurrency(parcela);
  resumoTopoTexto.innerText = `${parcelas} parcela(s) de aproximadamente ${formatCurrency(parcela)}.`;
  totalPago.innerText = formatCurrency(valorTotal);
  totalPagoTexto.innerText = `Ao fim do prazo, voce tera pago cerca de ${formatCurrency(valorTotal)}.`;
  totalJuros.innerText = formatCurrency(jurosTotais);
  totalJurosTexto.innerText = `Os juros representam aproximadamente ${formatNumber(percentualJuros)}% do valor emprestado.`;
  detalheResumo.innerText = `${formatNumber(taxa)}% ao mes`;
  detalheResumoTexto.innerText = `Cenario com ${parcelas} meses e custo total de ${formatCurrency(jurosTotais)} em juros.`;
}

window.onload = function () {
  document.getElementById("valorEmprestimo").addEventListener("input", calcular);
  document.getElementById("taxaMensal").addEventListener("input", calcular);
  document.getElementById("parcelas").addEventListener("input", calcular);
  calcular();
};
