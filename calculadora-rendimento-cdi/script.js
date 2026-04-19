function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarPercentual(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }) + "%";
}

function calcular() {
  const valorInicial = parseFloat(document.getElementById("valorInicial").value) || 0;
  const aporteMensal = parseFloat(document.getElementById("aporteMensal").value) || 0;
  const prazoMeses = parseInt(document.getElementById("prazoMeses").value, 10) || 0;
  const cdiAnual = parseFloat(document.getElementById("cdiAnual").value) || 0;
  const percentualCdi = parseFloat(document.getElementById("percentualCdi").value) || 0;

  const taxaAnual = (cdiAnual / 100) * (percentualCdi / 100);
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  let saldo = valorInicial;
  for (let mes = 0; mes < prazoMeses; mes += 1) {
    saldo = saldo * (1 + taxaMensal);
    saldo += aporteMensal;
  }

  const totalInvestido = valorInicial + (aporteMensal * prazoMeses);
  const rendimento = saldo - totalInvestido;

  document.getElementById("resumoTopoValor").innerText = formatarMoeda(saldo);
  document.getElementById("resumoTopoTexto").innerText = `Ao final de ${prazoMeses} mês(es), a projeção ficou em ${formatarMoeda(saldo)} com ${percentualCdi}% do CDI informado.`;
  document.getElementById("totalInvestido").innerText = formatarMoeda(totalInvestido);
  document.getElementById("rendimentoTotal").innerText = formatarMoeda(rendimento);
  document.getElementById("taxaMensal").innerText = formatarPercentual(taxaMensal * 100);
}

window.onload = function () {
  ["valorInicial", "aporteMensal", "prazoMeses", "cdiAnual", "percentualCdi"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
  });
  calcular();
};
