function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = x % y;
    x = y;
    y = temp;
  }
  return x || 1;
}

function simplificar(numerador, denominador) {
  if (denominador < 0) {
    numerador *= -1;
    denominador *= -1;
  }
  const divisor = gcd(numerador, denominador);
  return {
    numerador: numerador / divisor,
    denominador: denominador / divisor
  };
}

function parseFracao(valor) {
  const texto = String(valor || "").trim().replace(",", ".");
  if (!texto.includes("/")) {
    const numero = Number(texto);
    if (!Number.isFinite(numero)) return null;
    return { numerador: numero, denominador: 1 };
  }

  const partes = texto.split("/");
  if (partes.length !== 2) return null;

  const numerador = Number(partes[0].trim());
  const denominador = Number(partes[1].trim());

  if (!Number.isFinite(numerador) || !Number.isFinite(denominador) || denominador === 0) {
    return null;
  }

  return { numerador, denominador };
}

function formatarFracao(fracao) {
  if (fracao.denominador === 1) {
    return String(fracao.numerador);
  }
  return `${fracao.numerador}/${fracao.denominador}`;
}

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

function paraMisto(fracao) {
  const absNum = Math.abs(fracao.numerador);
  const inteiro = Math.trunc(fracao.numerador / fracao.denominador);
  const resto = absNum % fracao.denominador;

  if (resto === 0) {
    return String(inteiro);
  }

  if (Math.abs(fracao.numerador) < fracao.denominador) {
    return formatarFracao(fracao);
  }

  return `${inteiro} e ${resto}/${fracao.denominador}`;
}

function aplicarExemplo(fracaoA, operacao, fracaoB) {
  document.getElementById("fracaoA").value = fracaoA;
  document.getElementById("operacao").value = operacao;
  document.getElementById("fracaoB").value = fracaoB;
  calcular();
}

function calcular() {
  const fracaoA = parseFracao(document.getElementById("fracaoA").value);
  const fracaoB = parseFracao(document.getElementById("fracaoB").value);
  const operacao = document.getElementById("operacao").value;

  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const resultadoSimplificado = document.getElementById("resultadoSimplificado");
  const resultadoDecimal = document.getElementById("resultadoDecimal");
  const resultadoMisto = document.getElementById("resultadoMisto");

  if (!fracaoA || !fracaoB) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Preencha frações válidas, como 3/4 ou 2/1.";
    resultadoSimplificado.innerText = "-";
    resultadoDecimal.innerText = "-";
    resultadoMisto.innerText = "-";
    return;
  }

  let numerador = 0;
  let denominador = 1;

  if (operacao === "+") {
    numerador = fracaoA.numerador * fracaoB.denominador + fracaoB.numerador * fracaoA.denominador;
    denominador = fracaoA.denominador * fracaoB.denominador;
  } else if (operacao === "-") {
    numerador = fracaoA.numerador * fracaoB.denominador - fracaoB.numerador * fracaoA.denominador;
    denominador = fracaoA.denominador * fracaoB.denominador;
  } else if (operacao === "*") {
    numerador = fracaoA.numerador * fracaoB.numerador;
    denominador = fracaoA.denominador * fracaoB.denominador;
  } else if (operacao === "/") {
    if (fracaoB.numerador === 0) {
      resumoTopoValor.innerText = "-";
      resumoTopoTexto.innerText = "Não é possível dividir por uma fração equivalente a zero.";
      resultadoSimplificado.innerText = "-";
      resultadoDecimal.innerText = "-";
      resultadoMisto.innerText = "-";
      return;
    }
    numerador = fracaoA.numerador * fracaoB.denominador;
    denominador = fracaoA.denominador * fracaoB.numerador;
  }

  const resultado = simplificar(numerador, denominador);
  const valorDecimal = resultado.numerador / resultado.denominador;

  resumoTopoValor.innerText = formatarFracao(resultado);
  resumoTopoTexto.innerText = `${formatarFracao(fracaoA)} ${operacao} ${formatarFracao(fracaoB)} = ${formatarFracao(resultado)}.`;
  resultadoSimplificado.innerText = formatarFracao(resultado);
  resultadoDecimal.innerText = formatarNumero(valorDecimal);
  resultadoMisto.innerText = paraMisto(resultado);
}

window.onload = function () {
  document.getElementById("fracaoA").addEventListener("input", calcular);
  document.getElementById("fracaoB").addEventListener("input", calcular);
  document.getElementById("operacao").addEventListener("change", calcular);
  calcular();
};
