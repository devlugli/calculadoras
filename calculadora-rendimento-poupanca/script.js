function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const valorInicial = parseFloat(document.getElementById("valorInicial").value) || 0;
  const aporteMensal = parseFloat(document.getElementById("aporteMensal").value) || 0;
  const prazoMeses = parseInt(document.getElementById("prazoMeses").value, 10) || 0;
  const taxaMensal = (parseFloat(document.getElementById("taxaMensal").value) || 0) / 100;
  let saldo = valorInicial;
  for (let i = 0; i < prazoMeses; i += 1) {
    saldo = saldo * (1 + taxaMensal);
    saldo += aporteMensal;
  }
  const totalInvestido = valorInicial + (aporteMensal * prazoMeses);
  document.getElementById("resumoTopoValor").innerText = moeda(saldo);
  document.getElementById("resumoTopoTexto").innerText = `Ao final de ${prazoMeses} mes(es), a projeção ficou em ${moeda(saldo)}.`;
  document.getElementById("totalInvestido").innerText = moeda(totalInvestido);
  document.getElementById("rendimentoTotal").innerText = moeda(saldo - totalInvestido);
  document.getElementById("taxaUsada").innerText = `${(taxaMensal * 100).toFixed(2)}% a.m.`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach(function (campo) { campo.addEventListener("input", calcular); });
  calcular();
};
