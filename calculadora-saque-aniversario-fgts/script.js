const TABELA_SAQUE_ANIVERSARIO = [
  { limite: 500.00, aliquota: 0.50, adicional: 0.00, faixa: "Ate R$ 500,00" },
  { limite: 1000.00, aliquota: 0.40, adicional: 50.00, faixa: "De R$ 500,01 ate R$ 1.000,00" },
  { limite: 5000.00, aliquota: 0.30, adicional: 150.00, faixa: "De R$ 1.000,01 ate R$ 5.000,00" },
  { limite: 10000.00, aliquota: 0.20, adicional: 650.00, faixa: "De R$ 5.000,01 ate R$ 10.000,00" },
  { limite: 15000.00, aliquota: 0.15, adicional: 1150.00, faixa: "De R$ 10.000,01 ate R$ 15.000,00" },
  { limite: 20000.00, aliquota: 0.10, adicional: 1900.00, faixa: "De R$ 15.000,01 ate R$ 20.000,00" },
  { limite: Infinity, aliquota: 0.05, adicional: 2900.00, faixa: "Acima de R$ 20.000,00" }
];

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcular() {
  const saldo = parseFloat(document.getElementById("saldoFgts").value) || 0;
  const faixa = TABELA_SAQUE_ANIVERSARIO.find(function (item) {
    return saldo <= item.limite;
  });

  const saque = (saldo * faixa.aliquota) + faixa.adicional;

  document.getElementById("resumoTopoValor").innerText = formatarMoeda(saque);
  document.getElementById("resumoTopoTexto").innerText = `Para saldo total de ${formatarMoeda(saldo)}, a estimativa do saque-aniversário é ${formatarMoeda(saque)}.`;
  document.getElementById("aliquotaFaixa").innerText = `${(faixa.aliquota * 100).toFixed(0)}%`;
  document.getElementById("parcelaAdicional").innerText = formatarMoeda(faixa.adicional);
  document.getElementById("faixaSaldo").innerHTML = faixa.faixa;
}

window.onload = function () {
  document.getElementById("saldoFgts").addEventListener("input", calcular);
  calcular();
};
