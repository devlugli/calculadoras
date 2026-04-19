function calcular() {
  const base = parseFloat(document.getElementById("base").value) || 0;
  const expoente = parseFloat(document.getElementById("expoente").value) || 0;
  const resultado = Math.pow(base, expoente);
  document.getElementById("resumoTopoValor").innerText = Number(resultado).toLocaleString("pt-BR", { maximumFractionDigits: 6 });
  document.getElementById("resumoTopoTexto").innerText = `${base} elevado a ${expoente} resulta em ${document.getElementById("resumoTopoValor").innerText}.`;
}
window.onload = function () { document.querySelectorAll("input").forEach(function (c) { c.addEventListener("input", calcular); }); calcular(); };
