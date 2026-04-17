function adicionarDias(data, dias) {
  const resultado = new Date(data);
  resultado.setDate(resultado.getDate() + dias);
  return resultado;
}

function formatarData(data) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function diferencaEmDias(dataFutura) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  dataFutura.setHours(0, 0, 0, 0);
  return Math.round((dataFutura - hoje) / 86400000);
}

function calcular() {
  const dataCobertura = document.getElementById("dataCobertura").value;
  const duracao = parseInt(document.getElementById("duracao").value, 10) || 63;
  const resumoTopoTitulo = document.getElementById("resumoTopoTitulo");
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");

  resumoTopoTitulo.innerText = "Data provável do parto";

  if (!dataCobertura) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe a data da cobertura para calcular.";
    document.getElementById("janelaInicio").innerText = "-";
    document.getElementById("janelaFim").innerText = "-";
    document.getElementById("diasRestantes").innerText = "-";
    return;
  }

  const base = new Date(dataCobertura + "T12:00:00");
  const partoPrevisto = adicionarDias(base, duracao);
  const inicioJanela = adicionarDias(base, 58);
  const fimJanela = adicionarDias(base, 68);
  const faltam = diferencaEmDias(new Date(partoPrevisto));

  resumoTopoValor.innerText = formatarData(partoPrevisto);
  resumoTopoTexto.innerText = `Com base na data informada, a previsão média de parto cai em ${formatarData(partoPrevisto)}. A janela aproximada vai de ${formatarData(inicioJanela)} até ${formatarData(fimJanela)}.`;
  document.getElementById("janelaInicio").innerText = formatarData(inicioJanela);
  document.getElementById("janelaFim").innerText = formatarData(fimJanela);
  document.getElementById("diasRestantes").innerText = faltam >= 0 ? `${faltam} dias` : "Data já passou";
}

window.onload = function () {
  document.getElementById("dataCobertura").value = new Date().toISOString().slice(0, 10);
  document.getElementById("dataCobertura").addEventListener("change", calcular);
  document.getElementById("duracao").addEventListener("input", calcular);
  calcular();
};
