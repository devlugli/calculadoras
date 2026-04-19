function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const consumo = parseFloat(document.getElementById("consumoKwh").value) || 0;
  const valorKwh = parseFloat(document.getElementById("valorKwh").value) || 0;
  const taxas = parseFloat(document.getElementById("taxasExtras").value) || 0;
  const energia = consumo * valorKwh;
  const total = energia + taxas;
  document.getElementById("resumoTopoValor").innerText = moeda(total);
  document.getElementById("resumoTopoTexto").innerText = `Estimativa simples para ${consumo.toFixed(0)} kWh no mes.`;
  document.getElementById("energiaConsumida").innerText = moeda(energia);
  document.getElementById("taxasInformadas").innerText = moeda(taxas);
  document.getElementById("custoUnitario").innerText = moeda(valorKwh);
}

window.onload = function () {
  document.querySelectorAll("input").forEach(function (campo) { campo.addEventListener("input", calcular); });
  calcular();
};
