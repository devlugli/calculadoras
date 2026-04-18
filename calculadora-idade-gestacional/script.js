function diferencaEmDias(dataInicial, dataFinal) {
  const inicio = new Date(dataInicial);
  const fim = new Date(dataFinal);
  inicio.setHours(12, 0, 0, 0);
  fim.setHours(12, 0, 0, 0);
  return Math.floor((fim - inicio) / 86400000);
}

function calcular() {
  const dum = document.getElementById("dum").value;
  const hoje = new Date();

  if (!dum) {
    document.getElementById("resumoTopoTitulo").innerText = "Idade gestacional";
    document.getElementById("resumoTopoValor").innerText = "-";
    document.getElementById("resumoTopoTexto").innerText = "Informe a data da \u00faltima menstrua\u00e7\u00e3o para calcular.";
    return;
  }

  const dias = Math.max(0, diferencaEmDias(dum, hoje));
  const semanas = Math.floor(dias / 7);
  const diasRestantes = dias % 7;

  document.getElementById("resumoTopoTitulo").innerText = "Idade gestacional estimada";
  document.getElementById("resumoTopoValor").innerText = `${semanas} semana(s) e ${diasRestantes} dia(s)`;
  document.getElementById("resumoTopoTexto").innerText =
    "Estimativa baseada exclusivamente na DUM informada. Use apenas como refer\u00eancia inicial.";
}

window.onload = function () {
  document.getElementById("dum").value = new Date(Date.now() - (8 * 7 * 86400000)).toISOString().slice(0, 10);
  document.getElementById("dum").addEventListener("change", calcular);
  calcular();
};
