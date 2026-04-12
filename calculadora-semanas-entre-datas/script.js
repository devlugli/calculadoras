function calcular() {
  const dataInicialInput = document.getElementById("dataInicial").value;
  const dataFinalInput = document.getElementById("dataFinal").value;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const diasTotais = document.getElementById("diasTotais");
  const diasTotaisTexto = document.getElementById("diasTotaisTexto");
  const diasRestantes = document.getElementById("diasRestantes");
  const diasRestantesTexto = document.getElementById("diasRestantesTexto");
  const detalheResumo = document.getElementById("detalheResumo");
  const detalheResumoTexto = document.getElementById("detalheResumoTexto");

  if (!dataInicialInput || !dataFinalInput) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe a data inicial e a data final para calcular.";
    diasTotais.innerText = "-";
    diasTotaisTexto.innerText = "O total em dias aparecera aqui.";
    diasRestantes.innerText = "-";
    diasRestantesTexto.innerText = "Os dias restantes aparecerao aqui.";
    detalheResumo.innerText = "-";
    detalheResumoTexto.innerText = "Use para prazos, planejamentos e comparacao de periodos.";
    return;
  }

  const dataInicial = new Date(dataInicialInput + "T00:00:00");
  const dataFinal = new Date(dataFinalInput + "T00:00:00");
  const diferencaDias = Math.abs(Math.round((dataFinal.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24)));
  const semanas = Math.floor(diferencaDias / 7);
  const resto = diferencaDias % 7;

  resumoTopoValor.innerText = `${semanas} semana${semanas === 1 ? "" : "s"}`;
  resumoTopoTexto.innerText = `Entre as datas existem ${semanas} semana(s) completa(s) e ${resto} dia(s) restantes.`;
  diasTotais.innerText = `${diferencaDias} dia${diferencaDias === 1 ? "" : "s"}`;
  diasTotaisTexto.innerText = "Intervalo total em dias corridos entre as duas datas.";
  diasRestantes.innerText = `${resto} dia${resto === 1 ? "" : "s"}`;
  diasRestantesTexto.innerText = "Sobras depois de separar o periodo em blocos de 7 dias.";
  detalheResumo.innerText = `${semanas} sem / ${resto} dias`;
  detalheResumoTexto.innerText = `Leitura curta do intervalo entre ${dataInicial.toLocaleDateString("pt-BR")} e ${dataFinal.toLocaleDateString("pt-BR")}.`;
}

window.onload = function () {
  const hoje = new Date();
  const hojeFormatado = hoje.toISOString().split("T")[0];
  const proximaData = new Date(hoje);
  proximaData.setDate(proximaData.getDate() + 21);
  const proximaDataFormatada = proximaData.toISOString().split("T")[0];

  document.getElementById("dataInicial").value = hojeFormatado;
  document.getElementById("dataFinal").value = proximaDataFormatada;
  document.getElementById("dataInicial").addEventListener("change", calcular);
  document.getElementById("dataFinal").addEventListener("change", calcular);
  calcular();
};
