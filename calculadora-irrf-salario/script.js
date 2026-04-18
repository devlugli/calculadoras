const FAIXAS_INSS = [
  { limite: 1621.0, aliquota: 0.075 },
  { limite: 2902.84, aliquota: 0.09 },
  { limite: 4354.27, aliquota: 0.12 },
  { limite: 8475.55, aliquota: 0.14 }
];

const FAIXAS_IRRF = [
  { limite: 2428.8, aliquota: 0, deducao: 0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { limite: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { limite: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { limite: Infinity, aliquota: 0.275, deducao: 908.73 }
];

const DEDUCAO_DEPENDENTE = 189.59;

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function calcularINSS(salario) {
  let contribuicao = 0;
  let faixaAnterior = 0;
  const base = Math.min(Math.max(salario, 0), FAIXAS_INSS[FAIXAS_INSS.length - 1].limite);

  FAIXAS_INSS.forEach((faixa) => {
    if (base > faixaAnterior) {
      const valorFaixa = Math.min(base, faixa.limite) - faixaAnterior;
      contribuicao += valorFaixa * faixa.aliquota;
      faixaAnterior = faixa.limite;
    }
  });

  return contribuicao;
}

function calcularReducao2026(base) {
  if (base <= 5000) {
    return 312.89;
  }

  if (base <= 7350) {
    return 978.62 - (0.133145 * base);
  }

  return 0;
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const dependentes = Math.max(0, parseInt(document.getElementById("dependentes").value, 10) || 0);
  const descontoInss = calcularINSS(salario);
  const baseCalculo = Math.max(0, salario - descontoInss - (dependentes * DEDUCAO_DEPENDENTE));

  const faixa = FAIXAS_IRRF.find((item) => baseCalculo <= item.limite) || FAIXAS_IRRF[FAIXAS_IRRF.length - 1];
  const irrfBruto = Math.max(0, (baseCalculo * faixa.aliquota) - faixa.deducao);
  const reducao = Math.min(irrfBruto, calcularReducao2026(baseCalculo));
  const irrf = Math.max(0, irrfBruto - reducao);
  const liquidoParcial = salario - descontoInss - irrf;

  document.getElementById("resumoTopoTitulo").innerText = "IRRF mensal estimado";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(irrf);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa com base na tabela mensal de 2026. Outros eventos de folha podem alterar o valor retido.";

  document.getElementById("descontoInss").innerText = formatarMoeda(descontoInss);
  document.getElementById("baseCalculo").innerText = formatarMoeda(baseCalculo);
  document.getElementById("liquidoParcial").innerText = formatarMoeda(liquidoParcial);
}

window.onload = function () {
  document.querySelectorAll("input").forEach((campo) => {
    campo.addEventListener("input", calcular);
  });
  calcular();
};
