function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function calcular() {
  const valor = parseFloat(document.getElementById("valorOriginal").value) || 0;
  const multa = (parseFloat(document.getElementById("multaPercentual").value) || 0) / 100;
  const jurosMes = (parseFloat(document.getElementById("jurosPercentualMes").value) || 0) / 100;
  const dias = parseInt(document.getElementById("diasAtraso").value, 10) || 0;
  const multaValor = valor * multa;
  const jurosDia = jurosMes / 30;
  const jurosValor = valor * jurosDia * dias;
  const total = valor + multaValor + jurosValor;
  document.getElementById("resumoTopoValor").innerText = moeda(total);
  document.getElementById("resumoTopoTexto").innerText = `Total com multa de ${ (multa*100).toFixed(2)}% e juros proporcionais a ${dias} dia(s) de atraso.`;
}
window.onload = function () { document.querySelectorAll("input").forEach(function (c) { c.addEventListener("input", calcular); }); calcular(); };
