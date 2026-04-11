function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function atualizarDetalhes(principal, principalTexto, formula, formulaTexto, proximoPasso, proximoPassoTexto, nota) {
  document.getElementById("detalhePrincipal").innerText = principal;
  document.getElementById("detalhePrincipalTexto").innerText = principalTexto;
  document.getElementById("detalheFormula").innerText = formula;
  document.getElementById("detalheFormulaTexto").innerText = formulaTexto;
  document.getElementById("detalheProximoPasso").innerText = proximoPasso;
  document.getElementById("detalheProximoPassoTexto").innerText = proximoPassoTexto;
  document.getElementById("notaResultadoPercentual").innerText = nota;
}

function aplicarExemplo(tipo, valorA, valorB) {
  document.getElementById("tipoCalculo").value = tipo;

  if (tipo === "percentualDeValor") {
    document.getElementById("percentual1").value = valorA;
    document.getElementById("valor1").value = valorB;
  }

  if (tipo === "valorRepresentaPercentual") {
    document.getElementById("valorBase2").value = valorA;
    document.getElementById("valorComparado2").value = valorB;
  }

  if (tipo === "variacaoPercentual") {
    document.getElementById("valorInicial3").value = valorA;
    document.getElementById("valorFinal3").value = valorB;
  }

  trocarModo();
}

function trocarModo() {
  const tipo = document.getElementById("tipoCalculo").value;
  document.getElementById("modoPercentualDeValor").style.display = tipo === "percentualDeValor" ? "block" : "none";
  document.getElementById("modoValorRepresentaPercentual").style.display = tipo === "valorRepresentaPercentual" ? "block" : "none";
  document.getElementById("modoVariacaoPercentual").style.display = tipo === "variacaoPercentual" ? "block" : "none";
  calcular();
}

function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  if (tipo === "percentualDeValor") {
    const percentual = parseFloat(document.getElementById("percentual1").value) || 0;
    const valor = parseFloat(document.getElementById("valor1").value) || 0;
    const resultado = valor * (percentual / 100);

    resumoTopoTitulo.innerText = "Resultado do calculo percentual";
    resumoTopoValor.innerText = formatarNumero(resultado);
    resumoTopoTexto.innerText = `${formatarNumero(percentual)}% de ${formatarNumero(valor)} e ${formatarNumero(resultado)}.`;

    atualizarDetalhes(
      formatarNumero(resultado),
      "Este e o valor correspondente ao percentual informado.",
      `${formatarNumero(valor)} x ${formatarNumero(percentual)}%`,
      "A conta multiplica o valor pelo percentual e divide por 100.",
      "Compare com desconto ou reajuste",
      "Se quiser entender variacao entre dois valores, troque para aumento ou desconto percentual.",
      "Esse modo e ideal para promocoes, comissoes, metas, cashback e reajustes simples."
    );
    return;
  }

  if (tipo === "valorRepresentaPercentual") {
    const valorBase = parseFloat(document.getElementById("valorBase2").value) || 0;
    const valorComparado = parseFloat(document.getElementById("valorComparado2").value) || 0;

    if (valorBase === 0) {
      resumoTopoTitulo.innerText = "Percentual em relacao ao valor base";
      resumoTopoValor.innerText = "0,00%";
      resumoTopoTexto.innerText = "Informe um valor base maior que zero para calcular.";
      atualizarDetalhes(
        "0,00%",
        "Sem valor base nao existe comparacao percentual valida.",
        "valor comparado / valor base x 100",
        "Primeiro defina o valor total ou referencia.",
        "Informe a referencia correta",
        "Depois de preencher a base, a pagina mostra qual participacao o valor comparado representa.",
        "Esse modo funciona bem para saber fatia de vendas, participacao em meta e representatividade de um item."
      );
      return;
    }

    const resultado = (valorComparado / valorBase) * 100;
    resumoTopoTitulo.innerText = "Percentual em relacao ao valor base";
    resumoTopoValor.innerText = `${formatarNumero(resultado)}%`;
    resumoTopoTexto.innerText = `${formatarNumero(valorComparado)} representa ${formatarNumero(resultado)}% de ${formatarNumero(valorBase)}.`;

    atualizarDetalhes(
      `${formatarNumero(resultado)}%`,
      "Esse e o percentual que o valor comparado representa dentro da base.",
      `${formatarNumero(valorComparado)} / ${formatarNumero(valorBase)} x 100`,
      "A formula compara uma parte com o total para mostrar a participacao percentual.",
      "Analise participacao ou desempenho",
      "Use este resultado para saber peso de categoria, alcance de meta ou fatia do orcamento.",
      "Esse modo ajuda quando voce quer saber quanto um numero representa em relacao ao valor principal."
    );
    return;
  }

  const valorInicial = parseFloat(document.getElementById("valorInicial3").value) || 0;
  const valorFinal = parseFloat(document.getElementById("valorFinal3").value) || 0;

  if (valorInicial === 0) {
    resumoTopoTitulo.innerText = "Variacao percentual";
    resumoTopoValor.innerText = "0,00%";
    resumoTopoTexto.innerText = "Informe um valor inicial maior que zero para calcular.";
    atualizarDetalhes(
      "0,00%",
      "Sem valor inicial nao da para medir aumento ou desconto.",
      "(valor final - valor inicial) / valor inicial x 100",
      "A variacao sempre depende de um ponto de partida.",
      "Defina o valor inicial",
      "Assim a calculadora mostra se houve aumento ou reducao em termos percentuais.",
      "Esse modo e util para reajustes, promocao, salarios, receitas e comparacao de preco."
    );
    return;
  }

  const variacao = ((valorFinal - valorInicial) / valorInicial) * 100;
  const tipoVariacao = variacao >= 0 ? "aumento" : "desconto";

  resumoTopoTitulo.innerText = "Variacao percentual";
  resumoTopoValor.innerText = `${formatarNumero(variacao)}%`;
  resumoTopoTexto.innerText = `Ao passar de ${formatarNumero(valorInicial)} para ${formatarNumero(valorFinal)}, houve um ${tipoVariacao} de ${formatarNumero(Math.abs(variacao))}%.`;

  atualizarDetalhes(
    `${tipoVariacao === "aumento" ? "Aumento" : "Reducao"} de ${formatarNumero(Math.abs(variacao))}%`,
    "A pagina informa se o movimento foi positivo ou negativo para facilitar a leitura.",
    `(${formatarNumero(valorFinal)} - ${formatarNumero(valorInicial)}) / ${formatarNumero(valorInicial)} x 100`,
    "A variacao percentual mede o quanto o valor mudou em relacao ao inicio.",
    "Compare com outros cenarios",
    "Troque o valor final para testar outros reajustes e descontos sem recalcular manualmente.",
    "Esse modo e muito util para comparar antes e depois de um preco, salario ou indicador."
  );
}

window.onload = function () {
  document.getElementById("tipoCalculo").addEventListener("change", calcular);
  document.getElementById("percentual1").addEventListener("input", calcular);
  document.getElementById("valor1").addEventListener("input", calcular);
  document.getElementById("valorBase2").addEventListener("input", calcular);
  document.getElementById("valorComparado2").addEventListener("input", calcular);
  document.getElementById("valorInicial3").addEventListener("input", calcular);
  document.getElementById("valorFinal3").addEventListener("input", calcular);
  trocarModo();
};
