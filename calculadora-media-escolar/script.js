function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function trocarModo() {
  const modo = document.getElementById("modo").value;
  document.getElementById("pesos").style.display = modo === "ponderada" ? "block" : "none";
  calcular();
}

function calcular() {
  const notas = [
    parseFloat(document.getElementById("nota1").value) || 0,
    parseFloat(document.getElementById("nota2").value) || 0,
    parseFloat(document.getElementById("nota3").value) || 0,
    parseFloat(document.getElementById("nota4").value) || 0
  ];
  const modo = document.getElementById("modo").value;
  const mediaMinima = parseFloat(document.getElementById("mediaMinima").value) || 0;
  const soma = notas.reduce(function (acc, item) { return acc + item; }, 0);

  let media = 0;

  if (modo === "ponderada") {
    const pesos = [
      parseFloat(document.getElementById("peso1").value) || 0,
      parseFloat(document.getElementById("peso2").value) || 0,
      parseFloat(document.getElementById("peso3").value) || 0,
      parseFloat(document.getElementById("peso4").value) || 0
    ];
    const somaPesos = pesos.reduce(function (acc, item) { return acc + item; }, 0);
    const somaPonderada = notas.reduce(function (acc, nota, index) {
      return acc + (nota * pesos[index]);
    }, 0);
    media = somaPesos > 0 ? somaPonderada / somaPesos : 0;
  } else {
    media = soma / notas.length;
  }

  const situacao = media >= mediaMinima ? "Aprovado" : "Atencao";
  document.getElementById("resumoTopoValor").innerText = formatarNumero(media);
  document.getElementById("resumoTopoTexto").innerText = `Com média ${formatarNumero(media)}, a comparação foi feita contra a meta ${formatarNumero(mediaMinima)}.`;
  document.getElementById("situacaoFinal").innerHTML = situacao;
  document.getElementById("somaNotas").innerText = formatarNumero(soma);
  document.getElementById("resumoNotas").innerText = `${formatarNumero(media)} / ${formatarNumero(mediaMinima)}`;
}

window.onload = function () {
  ["modo", "nota1", "nota2", "nota3", "nota4", "peso1", "peso2", "peso3", "peso4", "mediaMinima"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  trocarModo();
};
