function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function calcular() {
  const largura = parseFloat(document.getElementById("largura").value) || 0;
  const comprimento = parseFloat(document.getElementById("comprimento").value) || 0;
  const quantidade = parseInt(document.getElementById("quantidade").value, 10) || 0;
  const perda = parseFloat(document.getElementById("perda").value) || 0;

  const areaBase = largura * comprimento;
  const areaTotal = areaBase * quantidade;
  const areaComMargem = areaTotal * (1 + (perda / 100));

  document.getElementById("resumoTopoValor").innerText = `${formatarNumero(areaTotal)} m²`;
  document.getElementById("resumoTopoTexto").innerText = `A área total calculada foi ${formatarNumero(areaTotal)} m², ou ${formatarNumero(areaComMargem)} m² com margem extra.`;
  document.getElementById("areaBase").innerText = `${formatarNumero(areaBase)} m²`;
  document.getElementById("areaTotal").innerText = `${formatarNumero(areaTotal)} m²`;
  document.getElementById("areaComMargem").innerText = `${formatarNumero(areaComMargem)} m²`;
}

window.onload = function () {
  ["largura", "comprimento", "quantidade", "perda"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
  });
  calcular();
};
