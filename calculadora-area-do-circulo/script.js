function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

function trocarModo() {
  const modo = document.getElementById("modo").value;
  document.getElementById("campoRaio").style.display = modo === "raio" ? "block" : "none";
  document.getElementById("campoDiametro").style.display = modo === "diametro" ? "block" : "none";
  calcular();
}

function calcular() {
  const modo = document.getElementById("modo").value;
  let raio = 0;

  if (modo === "raio") {
    raio = parseFloat(document.getElementById("raio").value) || 0;
  } else {
    const diametro = parseFloat(document.getElementById("diametro").value) || 0;
    raio = diametro / 2;
  }

  const area = Math.PI * raio * raio;
  const diametro = raio * 2;

  document.getElementById("resumoTopoValor").innerText = `${formatarNumero(area)} u²`;
  document.getElementById("resumoTopoTexto").innerText = `Usando raio ${formatarNumero(raio)}, a área do círculo é ${formatarNumero(area)} unidade(s) quadrada(s).`;
  document.getElementById("raioUsado").innerText = `${formatarNumero(raio)} u`;
  document.getElementById("diametroCalculado").innerText = `${formatarNumero(diametro)} u`;
}

window.onload = function () {
  ["modo", "raio", "diametro"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  trocarModo();
};
