const FAIXAS_INSS_2026 = [
  { limite: 1621.0, aliquota: 0.075 },
  { limite: 2902.84, aliquota: 0.09 },
  { limite: 4354.27, aliquota: 0.12 },
  { limite: 8475.55, aliquota: 0.14 }
];

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarPercentual(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + "%";
}

function calcularINSS(salario) {
  let contribuicao = 0;
  let faixaAnterior = 0;
  const base = Math.min(Math.max(salario, 0), FAIXAS_INSS_2026[FAIXAS_INSS_2026.length - 1].limite);

  FAIXAS_INSS_2026.forEach((faixa) => {
    if (base > faixaAnterior) {
      const valorFaixa = Math.min(base, faixa.limite) - faixaAnterior;
      contribuicao += valorFaixa * faixa.aliquota;
      faixaAnterior = faixa.limite;
    }
  });

  return {
    contribuicao,
    base
  };
}

function calcular() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const { contribuicao, base } = calcularINSS(salario);
  const aliquotaEfetiva = salario > 0 ? (contribuicao / salario) * 100 : 0;

  document.getElementById("resumoTopoTitulo").innerText = "Desconto estimado de INSS";
  document.getElementById("resumoTopoValor").innerText = formatarMoeda(contribuicao);
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa com tabela progressiva de janeiro de 2026 para empregado, dom\u00e9stico e trabalhador avulso.";

  document.getElementById("baseConsiderada").innerText = formatarMoeda(base);
  document.getElementById("aliquotaEfetiva").innerText = formatarPercentual(aliquotaEfetiva);
}

window.onload = function () {
  document.getElementById("salario").addEventListener("input", calcular);
  calcular();
};
