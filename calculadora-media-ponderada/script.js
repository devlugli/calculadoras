function formatNumber(value, digits = 2) {
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}

function getCampos() {
  return [
    { nota: Number(document.getElementById("nota1").value), peso: Number(document.getElementById("peso1").value) },
    { nota: Number(document.getElementById("nota2").value), peso: Number(document.getElementById("peso2").value) },
    { nota: Number(document.getElementById("nota3").value), peso: Number(document.getElementById("peso3").value) },
    { nota: Number(document.getElementById("nota4").value), peso: Number(document.getElementById("peso4").value) }
  ];
}

function aplicarExemplo(notas, pesos) {
  notas.forEach((nota, index) => {
    document.getElementById(`nota${index + 1}`).value = nota;
  });

  pesos.forEach((peso, index) => {
    document.getElementById(`peso${index + 1}`).value = peso;
  });

  calcular();
}

function calcular() {
  const campos = getCampos();
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const detalheSomaPonderada = document.getElementById("detalheSomaPonderada");
  const detalheSomaPonderadaTexto = document.getElementById("detalheSomaPonderadaTexto");
  const detalhePesos = document.getElementById("detalhePesos");
  const detalhePesosTexto = document.getElementById("detalhePesosTexto");
  const detalheFormula = document.getElementById("detalheFormula");
  const detalheFormulaTexto = document.getElementById("detalheFormulaTexto");
  const notaResultado = document.getElementById("notaResultado");

  const camposValidos = campos.filter((campo) => Number.isFinite(campo.nota) && Number.isFinite(campo.peso) && campo.peso > 0);

  if (!camposValidos.length) {
    resumoTopoValor.innerText = "-";
    resumoTopoTexto.innerText = "Informe pelo menos uma nota com peso maior que zero.";
    detalheSomaPonderada.innerText = "-";
    detalheSomaPonderadaTexto.innerText = "A soma ponderada aparecerá depois do cálculo.";
    detalhePesos.innerText = "-";
    detalhePesosTexto.innerText = "Os pesos válidos são somados para encontrar a média final.";
    detalheFormula.innerText = "-";
    detalheFormulaTexto.innerText = "A fórmula pronta aparecerá aqui.";
    notaResultado.innerText = "Preencha as notas e os pesos para calcular a média ponderada.";
    return;
  }

  const somaPonderada = camposValidos.reduce((acc, campo) => acc + campo.nota * campo.peso, 0);
  const somaPesos = camposValidos.reduce((acc, campo) => acc + campo.peso, 0);
  const media = somaPonderada / somaPesos;
  const partesFormula = camposValidos.map((campo) => `${formatNumber(campo.nota)} x ${formatNumber(campo.peso)}`);

  resumoTopoValor.innerText = formatNumber(media);
  resumoTopoTexto.innerText = `A média ponderada final é ${formatNumber(media)} considerando ${camposValidos.length} valor(es) com peso.`;
  detalheSomaPonderada.innerText = formatNumber(somaPonderada);
  detalheSomaPonderadaTexto.innerText = "Resultado da soma de cada nota multiplicada pelo peso correspondente.";
  detalhePesos.innerText = formatNumber(somaPesos);
  detalhePesosTexto.innerText = "Total usado no denominador da fórmula da média ponderada.";
  detalheFormula.innerText = `(${partesFormula.join(" + ")}) / ${formatNumber(somaPesos)}`;
  detalheFormulaTexto.innerText = "Primeiro somamos os produtos nota x peso e depois dividimos pela soma dos pesos.";
  notaResultado.innerText = `Leitura rápida: ${formatNumber(media)} é a nota final ponderada para os pesos informados.`;
}

window.onload = function () {
  ["nota1", "peso1", "nota2", "peso2", "nota3", "peso3", "nota4", "peso4"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calcular);
  });

  calcular();
};
