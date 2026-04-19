function trocarForma() {
  const forma = document.getElementById("forma").value;
  document.getElementById("camposQuadrado").style.display = forma === "quadrado" ? "block" : "none";
  document.getElementById("camposRetangulo").style.display = forma === "retangulo" ? "block" : "none";
  document.getElementById("camposTriangulo").style.display = forma === "triangulo" ? "block" : "none";
  calcular();
}
function calcular() {
  const forma = document.getElementById("forma").value;
  let perimetro = 0;
  if (forma === "quadrado") perimetro = (parseFloat(document.getElementById("ladoQuadrado").value) || 0) * 4;
  if (forma === "retangulo") perimetro = 2 * ((parseFloat(document.getElementById("baseRetangulo").value) || 0) + (parseFloat(document.getElementById("alturaRetangulo").value) || 0));
  if (forma === "triangulo") perimetro = (parseFloat(document.getElementById("lado1").value) || 0) + (parseFloat(document.getElementById("lado2").value) || 0) + (parseFloat(document.getElementById("lado3").value) || 0);
  document.getElementById("resumoTopoValor").innerText = Number(perimetro).toLocaleString("pt-BR", { maximumFractionDigits: 4 });
  document.getElementById("resumoTopoTexto").innerText = `Perimetro calculado para a figura selecionada.`;
}
window.onload = function () { document.querySelectorAll("input, select").forEach(function (c) { c.addEventListener("input", calcular); c.addEventListener("change", calcular); }); trocarForma(); };
