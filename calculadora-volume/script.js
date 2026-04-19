function trocarForma() {
  const forma = document.getElementById("forma").value;
  document.getElementById("camposCubo").style.display = forma === "cubo" ? "block" : "none";
  document.getElementById("camposCaixa").style.display = forma === "caixa" ? "block" : "none";
  document.getElementById("camposCilindro").style.display = forma === "cilindro" ? "block" : "none";
  calcular();
}
function calcular() {
  const forma = document.getElementById("forma").value;
  let volume = 0;
  if (forma === "cubo") {
    const lado = parseFloat(document.getElementById("ladoCubo").value) || 0;
    volume = lado * lado * lado;
  } else if (forma === "caixa") {
    volume = (parseFloat(document.getElementById("comprimento").value) || 0) * (parseFloat(document.getElementById("largura").value) || 0) * (parseFloat(document.getElementById("altura").value) || 0);
  } else {
    const raio = parseFloat(document.getElementById("raio").value) || 0;
    const altura = parseFloat(document.getElementById("alturaCilindro").value) || 0;
    volume = Math.PI * raio * raio * altura;
  }
  document.getElementById("resumoTopoValor").innerText = Number(volume).toLocaleString("pt-BR", { maximumFractionDigits: 4 });
  document.getElementById("resumoTopoTexto").innerText = "Volume calculado para o solido selecionado.";
}
window.onload = function () { document.querySelectorAll("input, select").forEach(function (c) { c.addEventListener("input", calcular); c.addEventListener("change", calcular); }); trocarForma(); };
