function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

function trocarForma() {
  const forma = document.getElementById("forma").value;
  document.getElementById("formaRetangulo").style.display = forma === "retangulo" ? "block" : "none";
  document.getElementById("formaTriangulo").style.display = forma === "triangulo" ? "block" : "none";
  document.getElementById("formaCirculo").style.display = forma === "circulo" ? "block" : "none";
  document.getElementById("formaTrapezio").style.display = forma === "trapezio" ? "block" : "none";
  calcular();
}

function calcular() {
  const forma = document.getElementById("forma").value;
  const resumoTopoValor = document.getElementById("resumoTopoValor");
  const resumoTopoTexto = document.getElementById("resumoTopoTexto");
  const detalheFigura = document.getElementById("detalheFigura");
  const detalheFormula = document.getElementById("detalheFormula");
  const detalheLeitura = document.getElementById("detalheLeitura");

  let area = 0;
  let formula = "-";
  let figura = "-";

  if (forma === "retangulo") {
    const base = parseFloat(document.getElementById("baseRetangulo").value) || 0;
    const altura = parseFloat(document.getElementById("alturaRetangulo").value) || 0;
    area = base * altura;
    figura = "Retangulo";
    formula = "base x altura";
  } else if (forma === "triangulo") {
    const base = parseFloat(document.getElementById("baseTriangulo").value) || 0;
    const altura = parseFloat(document.getElementById("alturaTriangulo").value) || 0;
    area = (base * altura) / 2;
    figura = "Triangulo";
    formula = "(base x altura) / 2";
  } else if (forma === "circulo") {
    const raio = parseFloat(document.getElementById("raioCirculo").value) || 0;
    area = Math.PI * raio * raio;
    figura = "Circulo";
    formula = "pi x raio^2";
  } else if (forma === "trapezio") {
    const baseMaior = parseFloat(document.getElementById("baseMaiorTrapezio").value) || 0;
    const baseMenor = parseFloat(document.getElementById("baseMenorTrapezio").value) || 0;
    const altura = parseFloat(document.getElementById("alturaTrapezio").value) || 0;
    area = ((baseMaior + baseMenor) * altura) / 2;
    figura = "Trapezio";
    formula = "((B + b) x h) / 2";
  }

  resumoTopoValor.innerText = `${formatarNumero(area)} u²`;
  resumoTopoTexto.innerText = `A área calculada para a figura selecionada é ${formatarNumero(area)} unidade(s) quadrada(s).`;
  detalheFigura.innerText = figura;
  detalheFormula.innerText = formula;
  detalheLeitura.innerText = `${formatarNumero(area)} u²`;
}

window.onload = function () {
  const ids = [
    "forma",
    "baseRetangulo",
    "alturaRetangulo",
    "baseTriangulo",
    "alturaTriangulo",
    "raioCirculo",
    "baseMaiorTrapezio",
    "baseMenorTrapezio",
    "alturaTrapezio"
  ];
  ids.forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcular);
    document.getElementById(id).addEventListener("change", calcular);
  });
  trocarForma();
};
