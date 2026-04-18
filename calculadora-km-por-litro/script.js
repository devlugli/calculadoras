function formatarNumero(valor, casas = 2) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: casas
  });
}

function calcular() {
  const km = Number(document.getElementById("km").value);
  const litros = Number(document.getElementById("litros").value);
  const resultado = document.getElementById("resultado");

  if (!Number.isFinite(km) || !Number.isFinite(litros) || km <= 0 || litros <= 0) {
    resultado.innerText = "Informe valores validos";
    return;
  }

  const consumo = km / litros;
  resultado.innerText = `${formatarNumero(consumo)} km/L`;
}

window.onload = function () {
  document.getElementById("km").addEventListener("input", calcular);
  document.getElementById("litros").addEventListener("input", calcular);
  calcular();
};
