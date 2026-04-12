function formatNumber(value, digits = 1) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}

function aplicarExemplo(tanque, consumo) {
  document.getElementById("capacidadeTanque").value = tanque;
  document.getElementById("consumoMedio").value = consumo;
  calcular();
}

function calcular() {
  const tanque = Number(document.getElementById("capacidadeTanque").value);
  const consumo = Number(document.getElementById("consumoMedio").value);

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const meioTanque = document.getElementById("meioTanque");
  const meioTanqueTexto = document.getElementById("meioTanqueTexto");
  const reservaVinte = document.getElementById("reservaVinte");
  const reservaVinteTexto = document.getElementById("reservaVinteTexto");
  const detalheResumo = document.getElementById("detalheResumo");
  const detalheResumoTexto = document.getElementById("detalheResumoTexto");

  if (!Number.isFinite(tanque) || !Number.isFinite(consumo) || tanque <= 0 || consumo <= 0) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe uma capacidade de tanque e um consumo medio validos.";
    meioTanque.innerText = "-";
    meioTanqueTexto.innerText = "O alcance com meio tanque aparecera aqui.";
    reservaVinte.innerText = "-";
    reservaVinteTexto.innerText = "A estimativa com margem de seguranca aparecera aqui.";
    detalheResumo.innerText = "-";
    detalheResumoTexto.innerText = "Use a autonomia para planejar abastecimento e paradas.";
    return;
  }

  const autonomia = tanque * consumo;
  const autonomiaMeioTanque = (tanque / 2) * consumo;
  const autonomiaComReserva = autonomia * 0.8;

  resumoTopoValor.innerText = `${formatNumber(autonomia)} km`;
  resumoTopoTexto.innerText = `Com tanque de ${formatNumber(tanque, 2)} L e consumo de ${formatNumber(consumo, 2)} km/L, a autonomia estimada e de ${formatNumber(autonomia)} km.`;
  meioTanque.innerText = `${formatNumber(autonomiaMeioTanque)} km`;
  meioTanqueTexto.innerText = "Boa referencia para trajetos curtos ou quando voce nao abastece ate o limite.";
  reservaVinte.innerText = `${formatNumber(autonomiaComReserva)} km`;
  reservaVinteTexto.innerText = "Considera usar apenas 80% do tanque para planejar com folga.";
  detalheResumo.innerText = `${formatNumber(consumo, 2)} km/L`;
  detalheResumoTexto.innerText = `Cada litro rende em media ${formatNumber(consumo, 2)} km nas condicoes informadas.`;
}

window.onload = function () {
  document.getElementById("capacidadeTanque").addEventListener("input", calcular);
  document.getElementById("consumoMedio").addEventListener("input", calcular);
  calcular();
};
