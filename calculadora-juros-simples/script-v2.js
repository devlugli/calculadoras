function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function aplicarExemploJuros(capital, taxa, tempo) {
  document.getElementById("capital").value = capital;
  document.getElementById("taxa").value = taxa;
  document.getElementById("tempo").value = tempo;
  calcular();
}

function calcular() {
  const capital = parseFloat(document.getElementById("capital").value) || 0;
  const taxa = parseFloat(document.getElementById("taxa").value) || 0;
  const tempo = parseFloat(document.getElementById("tempo").value) || 0;
  const juros = capital * (taxa / 100) * tempo;
  const montante = capital + juros;
  const jurosPorPeriodo = capital * (taxa / 100);

  document.getElementById("valorJuros").innerText = "R$ " + formatarNumero(juros);
  document.getElementById("valorMontante").innerText = "R$ " + formatarNumero(montante);
  document.getElementById("resumoTopoTitulo").innerText = "Resultado do calculo";
  document.getElementById("jurosPorPeriodo").innerText = "R$ " + formatarNumero(jurosPorPeriodo);
  document.getElementById("capitalResumo").innerText = "R$ " + formatarNumero(capital);
  document.getElementById("jurosResumoCurto").innerText = `${tempo} periodo(s) a ${formatarNumero(taxa)}%`;
  document.getElementById("jurosNotaResultado").innerText =
    `Partindo de R$ ${formatarNumero(capital)}, os juros simples somam R$ ${formatarNumero(juros)} e o montante final fica em R$ ${formatarNumero(montante)}.`;
}

window.onload = function () {
  document.getElementById("capital").addEventListener("input", calcular);
  document.getElementById("taxa").addEventListener("input", calcular);
  document.getElementById("tempo").addEventListener("input", calcular);
  calcular();
};
