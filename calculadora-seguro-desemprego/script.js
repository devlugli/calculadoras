const SALARIO_MINIMO_2026 = 1621.00;
const TETO_2026 = 2518.65;
const FAIXA_1_2026 = 2222.17;
const FAIXA_2_2026 = 3703.99;
const BASE_FAIXA_2_2026 = 1777.74;

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcularParcelas(mesesTrabalhados, solicitacao) {
  if (solicitacao === 1) {
    if (mesesTrabalhados >= 24) return 5;
    if (mesesTrabalhados >= 12) return 4;
    return 0;
  }

  if (solicitacao === 2) {
    if (mesesTrabalhados >= 24) return 5;
    if (mesesTrabalhados >= 12) return 4;
    if (mesesTrabalhados >= 9) return 3;
    return 0;
  }

  if (mesesTrabalhados >= 24) return 5;
  if (mesesTrabalhados >= 12) return 4;
  if (mesesTrabalhados >= 6) return 3;
  return 0;
}

function calcularParcela(salarioMedio) {
  if (salarioMedio <= FAIXA_1_2026) {
    return {
      valor: Math.max(salarioMedio * 0.8, SALARIO_MINIMO_2026),
      faixa: "Ate R$ 2.222,17"
    };
  }

  if (salarioMedio <= FAIXA_2_2026) {
    const valor = ((salarioMedio - FAIXA_1_2026) * 0.5) + BASE_FAIXA_2_2026;
    return {
      valor: Math.max(valor, SALARIO_MINIMO_2026),
      faixa: "De R$ 2.222,18 ate R$ 3.703,99"
    };
  }

  return {
    valor: TETO_2026,
    faixa: "Acima de R$ 3.703,99"
  };
}

function calcular() {
  const salarioMedio = parseFloat(document.getElementById("salarioMedio").value) || 0;
  const mesesTrabalhados = parseInt(document.getElementById("mesesTrabalhados").value, 10) || 0;
  const solicitacao = parseInt(document.getElementById("solicitacao").value, 10) || 1;

  const parcelaInfo = calcularParcela(salarioMedio);
  const parcelas = calcularParcelas(mesesTrabalhados, solicitacao);
  const total = parcelaInfo.valor * parcelas;

  document.getElementById("resumoTopoValor").innerText = formatarMoeda(parcelaInfo.valor);
  document.getElementById("resumoTopoTexto").innerText = parcelas > 0
    ? `Estimativa de ${parcelas} parcela(s) com base no salário médio informado.`
    : "Pelos dados informados, nao houve combinacao minima para estimativa de parcelas.";
  document.getElementById("quantidadeParcelas").innerText = parcelas > 0 ? String(parcelas) : "Sem estimativa";
  document.getElementById("faixaUsada").innerHTML = parcelaInfo.faixa;
  document.getElementById("valorTotal").innerText = parcelas > 0 ? formatarMoeda(total) : "-";
}

window.onload = function () {
  ["salarioMedio", "mesesTrabalhados", "solicitacao"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  calcular();
};
