function parseIntegers(value) {
  return value
    .split(/[,;\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item) && item !== 0);
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

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
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
    resumoTopoTexto.innerText = "Informe pelo menos dois números inteiros diferentes de zero.";
    detalhePrincipal.innerText = "-";
    detalhePrincipalTexto.innerText = "O MMC aparece depois que a lista é validada.";
    detalheConjunto.innerText = "-";
    detalheConjuntoTexto.innerText = "Use formatos como 4, 6 ou 6, 8, 12.";
    detalheUso.innerText = "-";
    detalheUsoTexto.innerText = "A ferramenta ajuda em frações, ciclos e períodos.";
    notaResultado.innerText = "Digite dois ou mais números inteiros para encontrar o menor múltiplo comum.";
    return;
  }

  const resultado = numeros.reduce((acc, value) => lcm(acc, value));
  const conjunto = numeros.join(", ");

  resumoTopoValor.innerText = String(resultado);
  resumoTopoTexto.innerText = `O MMC de ${conjunto} é ${resultado}.`;
  detalhePrincipal.innerText = String(resultado);
  detalhePrincipalTexto.innerText = "Este é o menor número positivo que todos os valores conseguem dividir sem resto.";
  detalheConjunto.innerText = conjunto;
  detalheConjuntoTexto.innerText = "Lista de números usada no cálculo do menor múltiplo comum.";
  detalheUso.innerText = "Múltiplo em comum";
  detalheUsoTexto.innerText = `Use ${resultado} para alinhar períodos, somar frações ou comparar repetições.`;
  notaResultado.innerText = `Leitura rápida: ${resultado} é o menor múltiplo comum entre os números informados.`;
}

window.onload = function () {
  document.getElementById("numeros").addEventListener("input", calcular);
  calcular();
};
