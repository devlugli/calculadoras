function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

function aplicarExemplo(a, b, c) {
  document.getElementById("coefA").value = a;
  document.getElementById("coefB").value = b;
  document.getElementById("coefC").value = c;
  calcular();
}

function calcular() {
  const a = parseFloat(document.getElementById("coefA").value) || 0;
  const b = parseFloat(document.getElementById("coefB").value) || 0;
  const c = parseFloat(document.getElementById("coefC").value) || 0;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const valorDelta = document.getElementById("valorDelta");
  const valorX1 = document.getElementById("valorX1");
  const valorX2 = document.getElementById("valorX2");

  if (a === 0) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "O coeficiente a precisa ser diferente de zero para formar uma equação do segundo grau.";
    valorDelta.innerText = "-";
    valorX1.innerText = "-";
    valorX2.innerText = "-";
    return;
  }

  const delta = (b * b) - (4 * a * c);
  valorDelta.innerText = formatarNumero(delta);

  if (delta < 0) {
    resumoTopoValor.innerText = "Sem raizes reais";
    resumoTopoTexto.innerText = "O delta ficou negativo, entao a equacao nao possui solucoes reais.";
    valorX1.innerText = "-";
    valorX2.innerText = "-";
    return;
  }

  const raizDelta = Math.sqrt(delta);
  const x1 = (-b + raizDelta) / (2 * a);
  const x2 = (-b - raizDelta) / (2 * a);

  resumoTopoValor.innerText = delta === 0 ? `x = ${formatarNumero(x1)}` : `x1 = ${formatarNumero(x1)} | x2 = ${formatarNumero(x2)}`;
  resumoTopoTexto.innerText = `Com delta = ${formatarNumero(delta)}, a equação foi resolvida pela fórmula de Bhaskara.`;
  valorX1.innerText = formatarNumero(x1);
  valorX2.innerText = formatarNumero(x2);
}

window.onload = function () {
  ["coefA", "coefB", "coefC"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
  });
  calcular();
};
