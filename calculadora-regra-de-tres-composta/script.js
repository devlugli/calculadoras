function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

function obterFator(base, novo, relacao) {
  if (base <= 0 || novo <= 0) return 0;
  return relacao === "direta" ? novo / base : base / novo;
}

function calcular() {
  const a1 = parseFloat(document.getElementById("a1").value) || 0;
  const a2 = parseFloat(document.getElementById("a2").value) || 0;
  const b1 = parseFloat(document.getElementById("b1").value) || 0;
  const b2 = parseFloat(document.getElementById("b2").value) || 0;
  const relA = document.getElementById("relA").value;
  const relB = document.getElementById("relB").value;
  const resultadoBase = parseFloat(document.getElementById("resultadoBase").value) || 0;

  const fatorA = obterFator(a1, a2, relA);
  const fatorB = obterFator(b1, b2, relB);
  const resultado = resultadoBase * fatorA * fatorB;

  document.getElementById("resumoTopoValor").innerText = formatarNumero(resultado);
  document.getElementById("resumoTopoTexto").innerText = `Resultado base ${formatarNumero(resultadoBase)} ajustado pelas duas grandezas informadas.`;
  document.getElementById("fatorA").innerText = formatarNumero(fatorA);
  document.getElementById("fatorB").innerText = formatarNumero(fatorB);
  document.getElementById("contaUsada").innerText = `${formatarNumero(resultadoBase)} x ${formatarNumero(fatorA)} x ${formatarNumero(fatorB)}`;
}

window.onload = function () {
  document.querySelectorAll("input, select").forEach(function (campo) {
    campo.addEventListener("input", calcular);
    campo.addEventListener("change", calcular);
  });
  calcular();
};
