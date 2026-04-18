function parseIntegers(value) {
  return value
    .split(/[,;\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item));
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const rest = x % y;
    x = y;
    y = rest;
  }

  return x;
}

function aplicarExemplo(valor) {
  document.getElementById("numeros").value = valor;
  calcular();
}

function calcular() {
  const numeros = parseIntegers(document.getElementById("numeros").value);
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const detalhePrincipal = document.getElementById("detalhePrincipal");
  const detalhePrincipalTexto = document.getElementById("detalhePrincipalTexto");
  const detalheConjunto = document.getElementById("detalheConjunto");
  const detalheConjuntoTexto = document.getElementById("detalheConjuntoTexto");
  const detalheUso = document.getElementById("detalheUso");
  const detalheUsoTexto = document.getElementById("detalheUsoTexto");
  const notaResultado = document.getElementById("notaResultado");

  if (numeros.length < 2) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe pelo menos dois números inteiros separados por vírgula.";
    detalhePrincipal.innerText = "-";
    detalhePrincipalTexto.innerText = "O MDC aparece depois que a lista é validada.";
    detalheConjunto.innerText = "-";
    detalheConjuntoTexto.innerText = "Use formatos como 12, 18 ou 24, 36, 60.";
    detalheUso.innerText = "-";
    detalheUsoTexto.innerText = "A ferramenta serve para fração, divisão em grupos e exercícios.";
    notaResultado.innerText = "Digite dois ou mais números inteiros para encontrar o maior divisor comum.";
    return;
  }

  const resultado = numeros.reduce((acc, value) => gcd(acc, value));
  const conjunto = numeros.join(", ");

  resumoTopoValor.innerText = String(resultado);
  resumoTopoTexto.innerText = `O MDC de ${conjunto} é ${resultado}.`;
  detalhePrincipal.innerText = String(resultado);
  detalhePrincipalTexto.innerText = "Este é o maior número que divide todos os valores sem deixar resto.";
  detalheConjunto.innerText = conjunto;
  detalheConjuntoTexto.innerText = "Lista de números usada no cálculo do maior divisor comum.";
  detalheUso.innerText = resultado === 1 ? "Números coprimos" : "Divisor em comum";
  detalheUsoTexto.innerText = resultado === 1
    ? "Como o MDC é 1, os números não possuem divisor comum maior."
    : `Você pode usar ${resultado} para simplificar frações ou dividir quantidades igualmente.`;
  notaResultado.innerText = `Leitura rápida: ${resultado} é o maior divisor comum entre os números informados.`;
}

window.onload = function () {
  document.getElementById("numeros").addEventListener("input", calcular);
  calcular();
};
