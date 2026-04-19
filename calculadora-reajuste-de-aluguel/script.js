function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcular() {
  const aluguel = parseFloat(document.getElementById("aluguelAtual").value) || 0;
  const percentual = parseFloat(document.getElementById("percentualReajuste").value) || 0;
  const aumento = aluguel * (percentual / 100);
  const novo = aluguel + aumento;
  document.getElementById("resumoTopoValor").innerText = moeda(novo);
  document.getElementById("resumoTopoTexto").innerText = `Com reajuste de ${percentual.toFixed(2)}%, o novo valor estimado do aluguel é ${moeda(novo)}.`;
  document.getElementById("valorAumento").innerText = moeda(aumento);
  document.getElementById("valorAnterior").innerText = moeda(aluguel);
  document.getElementById("percentualUsado").innerText = `${percentual.toFixed(2)}%`;
}

window.onload = function () {
  document.querySelectorAll("input").forEach(function (campo) { campo.addEventListener("input", calcular); });
  calcular();
};
