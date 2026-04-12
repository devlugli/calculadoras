function formatDate(date) {
  return date.toLocaleDateString("pt-BR");
}

function addMonths(date, months) {
  const result = new Date(date);
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

function aplicarExemplo(quantidade, unidade, operacao) {
  document.getElementById("quantidade").value = quantidade;
  document.getElementById("unidade").value = unidade;
  document.getElementById("operacao").value = operacao;
  calcular();
}

function calcular() {
  const dataBaseInput = document.getElementById("dataBase").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const unidade = document.getElementById("unidade").value;
  const operacao = document.getElementById("operacao").value;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const diaSemana = document.getElementById("diaSemana");
  const diaSemanaTexto = document.getElementById("diaSemanaTexto");
  const intervaloUsado = document.getElementById("intervaloUsado");
  const intervaloUsadoTexto = document.getElementById("intervaloUsadoTexto");
  const detalheResumo = document.getElementById("detalheResumo");
  const detalheResumoTexto = document.getElementById("detalheResumoTexto");

  if (!dataBaseInput || !Number.isFinite(quantidade) || quantidade < 0) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe uma data base e uma quantidade valida.";
    diaSemana.innerText = "-";
    diaSemanaTexto.innerText = "O dia da semana aparecera aqui.";
    intervaloUsado.innerText = "-";
    intervaloUsadoTexto.innerText = "O intervalo usado aparecera aqui.";
    detalheResumo.innerText = "-";
    detalheResumoTexto.innerText = "Use para vencimentos, entregas e planejamento.";
    return;
  }

  const base = new Date(dataBaseInput + "T00:00:00");
  const sinal = operacao === "subtrair" ? -1 : 1;
  let resultado = new Date(base);

  if (unidade === "dias") {
    resultado.setDate(resultado.getDate() + quantidade * sinal);
  } else if (unidade === "semanas") {
    resultado.setDate(resultado.getDate() + quantidade * 7 * sinal);
  } else if (unidade === "meses") {
    resultado = addMonths(resultado, quantidade * sinal);
  } else if (unidade === "anos") {
    resultado = addMonths(resultado, quantidade * 12 * sinal);
  }

  const nomeOperacao = operacao === "subtrair" ? "menos" : "mais";
  const nomeDiaSemana = resultado.toLocaleDateString("pt-BR", { weekday: "long" });

  resumoTopoValor.innerText = formatDate(resultado);
  resumoTopoTexto.innerText = `${formatDate(base)} ${nomeOperacao} ${quantidade} ${unidade} resulta em ${formatDate(resultado)}.`;
  diaSemana.innerText = nomeDiaSemana;
  diaSemanaTexto.innerText = "Ajuda a validar se a data cai em dia util, fim de semana ou feriado.";
  intervaloUsado.innerText = `${operacao} ${quantidade} ${unidade}`;
  intervaloUsadoTexto.innerText = "O calculo foi feito a partir da data base informada.";
  detalheResumo.innerText = formatDate(resultado);
  detalheResumoTexto.innerText = `A data encontrada cai em ${nomeDiaSemana}.`;
}

window.onload = function () {
  const hoje = new Date().toISOString().split("T")[0];
  document.getElementById("dataBase").value = hoje;
  document.getElementById("dataBase").addEventListener("change", calcular);
  document.getElementById("operacao").addEventListener("change", calcular);
  document.getElementById("quantidade").addEventListener("input", calcular);
  document.getElementById("unidade").addEventListener("change", calcular);
  calcular();
};
