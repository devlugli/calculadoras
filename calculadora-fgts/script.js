function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const meses = parseInt(document.getElementById("meses").value, 10) || 0;
  const saldoInicial = parseFloat(document.getElementById("saldoInicial").value) || 0;

  const depositoMensal = salario * 0.08;
  const totalDepositado = depositoMensal * meses;
  const saldoFinal = saldoInicial + totalDepositado;
  const multa = saldoFinal * 0.40;

  document.getElementById("resumoTopoValor").innerText = formatarMoeda(saldoFinal);
  document.getElementById("resumoTopoTexto").innerText = `Com salário de ${formatarMoeda(salario)} e ${meses} mês(es), o saldo estimado ficou em ${formatarMoeda(saldoFinal)}.`;
  document.getElementById("depositoMensal").innerText = formatarMoeda(depositoMensal);
  document.getElementById("totalDepositado").innerText = formatarMoeda(totalDepositado);
  document.getElementById("multaRescisoria").innerText = formatarMoeda(multa);
}

window.onload = function () {
  ["salario", "meses", "saldoInicial"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
  });
  calcular();
};
