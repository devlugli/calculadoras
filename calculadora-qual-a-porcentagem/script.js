function formatNumber(value, digits = 2) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}

function aplicarExemplo(base, comparado) {
  document.getElementById("valorBase").value = base;
  document.getElementById("valorComparado").value = comparado;
  calcular();
}

function calcular() {
  const valorBase = Number(document.getElementById("valorBase").value);
  const valorComparado = Number(document.getElementById("valorComparado").value);

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const detalhePrincipal = document.getElementById("detalhePrincipal");
  const detalhePrincipalTexto = document.getElementById("detalhePrincipalTexto");
  const detalheFormula = document.getElementById("detalheFormula");
  const detalheFormulaTexto = document.getElementById("detalheFormulaTexto");
  const detalheUso = document.getElementById("detalheUso");
  const detalheUsoTexto = document.getElementById("detalheUsoTexto");

  if (!Number.isFinite(valorBase) || !Number.isFinite(valorComparado) || valorBase <= 0) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe um valor base maior que zero para calcular o percentual.";
    detalhePrincipal.innerText = "-";
    detalhePrincipalTexto.innerText = "O valor base precisa ser maior que zero.";
    detalheFormula.innerText = "-";
    detalheFormulaTexto.innerText = "A formula aparecera aqui depois do calculo.";
    detalheUso.innerText = "-";
    detalheUsoTexto.innerText = "Use com metas, orcamento, comissao ou participacao.";
    return;
  }

  const percentual = (valorComparado / valorBase) * 100;

  resumoTopoValor.innerText = `${formatNumber(percentual)}%`;
  resumoTopoTexto.innerText = `${formatNumber(valorComparado)} representa ${formatNumber(percentual)}% de ${formatNumber(valorBase)}.`;
  detalhePrincipal.innerText = `${formatNumber(percentual)}% do total`;
  detalhePrincipalTexto.innerText = `O valor comparado ocupa ${formatNumber(percentual)}% dentro do valor base informado.`;
  detalheFormula.innerText = `(${formatNumber(valorComparado)} / ${formatNumber(valorBase)}) x 100`;
  detalheFormulaTexto.innerText = "Dividimos a parte pelo total e multiplicamos por 100.";
  detalheUso.innerText = "Comparacao pronta";
  detalheUsoTexto.innerText = "Use o resultado para medir participacao, desempenho, desconto ou proporcao.";
}

window.onload = function () {
  document.getElementById("valorBase").addEventListener("input", calcular);
  document.getElementById("valorComparado").addEventListener("input", calcular);
  calcular();
};
