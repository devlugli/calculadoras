function fmt(valor, casas) {
  return Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

function calcular() {
  const potencia = parseFloat(document.getElementById("potenciaW").value) || 0;
  const horasDia = parseFloat(document.getElementById("horasDia").value) || 0;
  const diasMes = parseInt(document.getElementById("diasMes").value, 10) || 0;
  const quantidade = parseInt(document.getElementById("quantidade").value, 10) || 0;
  const potenciaTotal = potencia * quantidade;
  const consumoDia = (potenciaTotal * horasDia) / 1000;
  const consumoMes = consumoDia * diasMes;
  document.getElementById("resumoTopoValor").innerText = `${fmt(consumoMes, 2)} kWh`;
  document.getElementById("resumoTopoTexto").innerText = `Consumo estimado para ${quantidade} aparelho(s) com uso de ${horasDia} hora(s) por dia.`;
  document.getElementById("consumoDia").innerText = `${fmt(consumoDia, 2)} kWh`;
  document.getElementById("horasMes").innerText = `${fmt(horasDia * diasMes, 1)} h`;
  document.getElementById("potenciaTotal").innerText = `${fmt(potenciaTotal, 0)} W`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach(function (campo) { campo.addEventListener("input", calcular); });
  calcular();
};
